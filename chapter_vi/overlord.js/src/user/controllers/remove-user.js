/** @module controllers/remove-user */
const userService = require('../services')

const { validationResult } = require('express-validator')

const { errorMessage } = require('../../utils/error-message')
/**
 * @name Delete user
 * @path {DELETE} /overlord/v1/user/:id
*/
exports.remove = async (req, res) => {
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

  await userService.remove(user)

  return res.status(200).json({
    id: user.id,
    description: user.username
  })
}
