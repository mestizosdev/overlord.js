/** @module user/services/get-user-by-username */
const db = require('../../../models')

/**
 * Get user by username
 *
 * @async
 * @param {string} username - Username
 * @returns {User} user
*/
exports.getByUsername = async (username) => {
  const user = await db.User.findOne({
    where: { username }
  })

  if (user) {
    return user
  }
}
