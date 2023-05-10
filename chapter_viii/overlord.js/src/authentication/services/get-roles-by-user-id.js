/** @module authentication/services/get-roles-by-user-id */
const db = require('../../models')

/**
 * Get roles by user id
 *
 * @async
 * @param {string} name
 * @returns {Role[]} roles
*/
exports.getByUserId = async (userId) => {
  const roles = await db.UserRole.findAll({
    attributes: ['role'],
    where: { userId },
    order: [
      ['role', 'ASC']
    ]
  })

  return roles
}
