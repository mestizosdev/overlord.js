/** @module role/services/create-role */
const db = require('../../models')

/**
 * Create role
 *
 * @async
 * @param {Role} create - Role to create
 * @returns {Role} role
 */
exports.create = async (roleNew) => {
  const role = db.Role.build({
    name: roleNew.name,
    observation: roleNew.observation
  })

  return await role.save()
}
