CREATE OR REPLACE FUNCTION fun_create_user()
	RETURNS trigger
LANGUAGE 'plpgsql'
AS $BODY$
declare
	r record;
	v_count integer;
	cur_modules cursor for
		select id from adm_modules
		where status = true;
BEGIN

	for r in cur_modules loop
		insert into adm_access(status, module_id, user_id)
		values (true, r.id, new.id);
	end loop;

	return new;
END;
$BODY$;

