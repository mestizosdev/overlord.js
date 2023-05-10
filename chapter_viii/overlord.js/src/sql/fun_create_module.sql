CREATE OR REPLACE FUNCTION fun_create_module()
	RETURNS trigger
LANGUAGE 'plpgsql'
AS $$
declare
	r record;
	v_count integer;
	cur_users cursor for
		select username from adm_users;
BEGIN

	for u in cur_users loop
		insert into adm_access(
		  status, module_id, user_id)
		  values (true, new.id, u.user_id);
	end loop;

	return new;
END;
$$;

