/** @module role/controllers/helpers/isRoleRegister */
const roleService = require('../../services')

exports.isRoleRegister = async (name) => {
  const exist = await roleService.getByName(name)

  if (exist) {
    return {
      exist: true,
      message: `The role ${name} already exist`
    }
  }

  return { exist: false, message: '' }
}
