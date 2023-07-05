/** @module role/services/update-role */
const { ValidationError } = require('sequelize')

const ErrorDatabase = require('../../utils/error-database')

/**
 * Update role
 *
 * @async
 * @param {Role} role - Current role to update
 * @param {boolean} status - Status of role
 * @returns {Role}
 */
exports.update = async (role, observation, status) => {
  return await role.update({
    observation,
    status
  }).catch((error) => {
    if (error instanceof ValidationError) {
      throw new ErrorDatabase(
        'Database error in update user method',
        error.errors
      )
    }
  })
}
