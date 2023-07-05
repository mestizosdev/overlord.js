/** @module role/services/get-role-by-name */
const db = require('../../../models')

/**
 * Get role by name
 *
 * @async
 * @param {string} name
 * @returns {Role} role
*/
exports.getByName = async (name) => {
  const role = await db.Role.findOne({
    where: { name }
  })

  if (role) {
    return role
  }
}
