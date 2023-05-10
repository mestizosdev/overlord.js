CREATE TRIGGER tg_module_access
               after INSERT
               ON adm_modules
               FOR EACH ROW
               EXECUTE PROCEDURE fun_create_module();
