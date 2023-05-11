/** @module access/controllers/get-access-by-user */
const { validationResult } = require('express-validator')

const accessService = require('../services')
const { errorMessage } = require('../../utils/error-message')
/**
 * @name Get access by userId
 * @path {GET} /overlord/v1/access/:userId
*/
exports.getByUserId = async (req, res) => {
  // #swagger.tags = ['Access']
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errors, req)
    )
  }

  const userId = req.params.userId
  const access = await accessService.getByUserId(userId)

  if (!access) {
    const message = 'Access don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  return res.status(200).json({
    access
  })
}
