/** @module controllers/create-user */
const { validationResult } = require('express-validator')

const userService = require('../services')
const passwordUtil = require('../../utils/password')
const { errorMessage } = require('../../utils/error-message')
const register = require('./helpers/is-username-or-email-register')

/**
 * @name Create user
 * @path {POST} /overlord/v1/user
 */
exports.create = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json(
        errorMessage(errors, req)
      )
    }

    const { username, email, password } = req.body

    const isUserExist = await register.isUsernameOrEmailRegister(username, email)

    if (isUserExist.exist) {
      return res.status(404).json(
        errorMessage(isUserExist.message, req)
      )
    }

    // Conditional operator or ternary operator
    // condition ? exprIfTrue : exprIfFalse
    const passwordToSave = (typeof password !== 'undefined' &&
    password !== null)
      ? password
      : passwordUtil.generate()

    const user = await userService.create(
      { username, email, password: passwordToSave }
    )

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      status: user.status
    })
  } catch (error) {
    return res.status(503).json(
      errorMessage(error, req)
    )
  }
}
