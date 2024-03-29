/** @module controllers/update-user */
const { validationResult } = require('express-validator')

const userService = require('../services')
const { errorMessage } = require('../../utils/error-message')
const register = require('./helpers/is-username-or-email-register')

/**
 * @name Update user
 * @path {PUT} /overlord/v1/user/:id
*/
exports.update = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json(
        errorMessage(errors, req)
      )
    }

    const user = await userService.getById(req.params.id)

    if (!user) {
      return res.status(404).json(
        errorMessage('User don\'t exist', req)
      )
    }

    const { username, email, password, status } = req.body

    const isUserExist = await register.isUsernameOrEmailRegister(username, email)

    if (isUserExist.exist) {
      return res.status(404).json(
        errorMessage(isUserExist.message, req)
      )
    }

    const userUpdated = await userService.update(
      user,
      { username, email, password, status }
    )

    res.status(200).json({
      id: userUpdated.id,
      username: userUpdated.username,
      email: userUpdated.email,
      createdAt: userUpdated.createdAt,
      status: userUpdated.status
    })
  } catch (error) {
    return res.status(503).json(
      errorMessage(error, req)
    )
  }
}
