/** @module module/controllers/remove-module */
const moduleService = require('../services')

const { validationResult } = require('express-validator')

const { errorMessage } = require('../../utils/error-message')
/**
 * @name Delete module
 * @path {DELETE} /overlord/v1/module/:id
*/
exports.remove = async (req, res) => {
  // #swagger.tags = ['Module']
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errors, req)
    )
  }

  const module = await moduleService.getById(req.params.id)

  if (!module) {
    const message = 'Module don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  await moduleService.remove(module)

  return res.status(200).json({
    id: module.id,
    description: module.name
  })
}
