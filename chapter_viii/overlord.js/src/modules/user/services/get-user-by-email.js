/** @module user/services/user */
const db = require('../../../models')

/**
 * Get user by email
 *
 * @async
 * @param {string} email - Username
 * @returns {User} user
*/
exports.getByEmail = async (email) => {
  const user = await db.User.findOne({
    where: { email }
  })

  if (user) {
    return user
  }
}
