/** @module access/controllers/update-access */
const { validationResult } = require('express-validator')

const accessService = require('../services')
const moduleService = require('../../module/services')
const { errorMessage } = require('../../utils/error-message')
/**
 * @name Put access
 * @path {PUT} /overlord/v1/access/:id
*/
exports.update = async (req, res) => {
  // #swagger.tags = ['Access']
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errors, req)
    )
  }

  const access = await accessService.getById(req.params.id)

  if (!access) {
    const message = 'Access don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  const module = moduleService.getById(access.moduleId)

  if (!module.role) {
    const message = 'Module role don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  return res.status(200).json({
    module
  })
}
