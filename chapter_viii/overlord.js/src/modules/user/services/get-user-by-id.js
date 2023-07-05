/** @module user/services/get-user-by-id */
const db = require('../../../models')

/**
 * Get user
 *
 * @async
 * @param {number} getById - User Id
 * @returns {User} user
*/
exports.getById = async (userId) => {
  const user = await db.User.findOne({
    where: { id: userId }
  })

  if (user) {
    return user
  }
}
