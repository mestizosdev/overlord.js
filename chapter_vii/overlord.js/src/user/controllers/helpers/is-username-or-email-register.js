/** @module controllers/helpers/isUsernameOrEmailRegister */
const userService = require('../../services')

async function isUsernameOrEmailRegister (username, email) {
  let userExist = await userService.getByUsername(username)

  if (userExist) {
    return {
      exist: true,
      message: `The username ${username} already exist`
    }
  }

  userExist = await userService.getByEmail(email)

  if (userExist) {
    return {
      exist: true,
      message: `The email ${email} already exist`
    }
  }

  return { exist: false, message: '' }
}

module.exports.isUsernameOrEmailRegister = isUsernameOrEmailRegister
