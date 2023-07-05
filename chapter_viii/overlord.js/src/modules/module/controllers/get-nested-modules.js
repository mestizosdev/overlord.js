/** @module module/controllers/get-nested-modules */
const moduleService = require('../services')
const { errorMessage } = require('../../utils/error-message')

/**
 * @name Get nested modules
 * @path {GET} /overlord/v1/module/nested/modules
*/
exports.getNestedModules = async (req, res) => {
  // #swagger.tags = ['Module']

  const modules = await moduleService.getNestedModules()

  if (!modules[0].json) {
    const message = 'Modules don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  return res.status(200).json(modules[0].json[0])
}
