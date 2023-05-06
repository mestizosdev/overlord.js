/** @module controllers/get-user-by-id */
const { validationResult } = require('express-validator')

const userService = require('../services')
const { errorMessage } = require('../../utils/error-message')
/**
 * @name Get user by id
 * @path {GET} /overlord/v1/user/:id
*/
exports.getById = async (req, res) => {
  // #swagger.tags = ['User']
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errors, req)
    )
  }

  const user = await userService.getById(req.params.id)

  if (!user) {
    const message = 'User don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    status: user.status
  })
}
