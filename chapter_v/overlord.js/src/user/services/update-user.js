/** @module services/update-user */
const { ValidationError } = require('sequelize')

const passwordUtil = require('../../utils/password')
const ErrorDatabase = require('../../utils/error-database')

/**
 * Update user
 *
 * @async
 * @param {User} userToUpdate - Current user to update
 * @param {User} userWithNewData - User with new data
 * @returns {User}
 */
exports.update = async (userToUpdate, userWithNewData) => {
  return await userToUpdate.update({
    username: userWithNewData.username,
    email: userWithNewData.email,
    password: await passwordUtil.encrypt(userWithNewData.password),
    status: userWithNewData.status
  }).catch((error) => {
    if (error instanceof ValidationError) {
      console.log(error.errors)
      throw new ErrorDatabase(
        'Database error in updateUser method',
        error.errors
      )
    } else {
      throw new Error(error)
    }
  })
}
