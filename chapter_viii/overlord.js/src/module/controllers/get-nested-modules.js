/** @module module/controllers/get-nested-modules */
const { validationResult } = require('express-validator')

const moduleService = require('../services')
const { errorMessage } = require('../../utils/error-message')

/**
 * @name Get nested modules
 * @path {GET} /overlord/v1/module/nested
*/
exports.getNestedModules = async (req, res) => {
  // #swagger.tags = ['Module']
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errors, req)
    )
  }

  const modules = await moduleService.getNestedModules()

  if (!modules[0].json) {
    const message = 'Modules don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  res.status(200).json(modules[0].json[0])
}
