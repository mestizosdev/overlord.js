-- View: v_adm_access

CREATE OR REPLACE VIEW v_adm_access
 AS
select
	mod.id,
	mod.name,
	mod.parent,
	mod.path,
	mod.level,
	mod.module_id as parent_id,
	mod.icon,
	mod.link,
	u.username
from
	v_adm_modules as mod
inner join adm_access as a
on
	mod.id = a.module_id
inner join adm_users as u
on
	a.user_id = u.id
where
	a.read = true
	and a.status = true
	and mod.status = true;
