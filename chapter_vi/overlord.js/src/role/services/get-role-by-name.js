/** @module role/services/get-role-by-role */
const db = require('../../models')

/**
 * Get role by role
 *
 * @async
 * @param {string} role - role
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
