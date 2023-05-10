CREATE OR REPLACE FUNCTION fun_tree_module(_status boolean = NULL)
  RETURNS jsonb
  LANGUAGE plpgsql AS
$$
DECLARE
   _nest_lvl int;

BEGIN
   -- add level of nesting recursively
   CREATE TEMP TABLE t ON COMMIT DROP AS
   WITH RECURSIVE t AS (
      SELECT *, 1 AS lvl
      FROM   adm_modules
      WHERE  module_id IS NULL
      AND   (status = _status OR _status IS NULL) -- default: whole table

      UNION ALL
      SELECT a.*, lvl + 1
      FROM   t
      JOIN   adm_modules a ON a.module_id = t.id
      )
   TABLE t;
   
   -- optional idx for big tables with many levels of nesting
   -- CREATE INDEX ON t (lvl, id);

   _nest_lvl := (SELECT max(lvl) FROM t);

   -- no nesting found, return simple result
   IF _nest_lvl = 1 THEN 
      RETURN (  -- exits functions
      SELECT jsonb_agg(sub) -- AS result
      FROM  (
         SELECT status
              , jsonb_agg(sub) AS root
         FROM  (
            SELECT id AS key, name AS label, status, module_id, NULL AS children
            FROM   t
            ORDER  BY status, id
            ) sub
         GROUP BY 1
         ) sub
      );
   END IF;

   -- start collapsing with leaves at highest level
   CREATE TEMP TABLE j ON COMMIT DROP AS
   SELECT module_id AS id
        , jsonb_agg (sub) AS children
   FROM  (
      SELECT id AS key, name AS label, status, module_id  -- status redundant?
      FROM   t
      WHERE  lvl = _nest_lvl
      ORDER  BY id
      ) sub
   GROUP  BY module_id;

   -- optional idx for big tables with many levels of nesting
   -- CREATE INDEX ON j (id);

   -- iterate all the way down to lvl 2
   -- write to same table; ID is enough to identify
   WHILE _nest_lvl > 2
   LOOP
      _nest_lvl := _nest_lvl - 1;

      INSERT INTO j(id, children)
      SELECT module_id     -- AS id
           , jsonb_agg(sub) -- AS children
      FROM  (
         SELECT id AS key, t.name AS label, t.status, module_id, j.children  -- status redundant?
         FROM   t
         LEFT   JOIN j USING (id)  -- may or may not have children
         WHERE  t.lvl = _nest_lvl
         ORDER  BY id
         ) sub
      GROUP  BY module_id;
   END LOOP;

   -- nesting found, return nested result
   RETURN ( -- exits functions
   SELECT jsonb_agg(sub) -- AS result
   FROM  (
      SELECT status
           , jsonb_agg (sub) AS root
      FROM  (
         SELECT id AS key, name AS label, status, module_id, j.children
         FROM   t
         LEFT   JOIN j USING (id)
         WHERE  t.lvl = 1
         ORDER  BY status, id
         ) sub
      GROUP  BY 1
      ) sub
   );
END
$$;
