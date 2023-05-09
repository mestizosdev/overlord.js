-- DROP TRIGGER if exists tg_user_access ON users;

CREATE TRIGGER tg_user_access
               after INSERT
               ON adm_users
               FOR EACH ROW
               EXECUTE PROCEDURE fun_create_user();
