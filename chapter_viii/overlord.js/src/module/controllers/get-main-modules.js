/** @module module/controllers/get-main-modules */
const moduleService = require('../services')
const { errorMessage } = require('../../utils/error-message')

/**
 * @name Get main modules
 * @path {GET} /overlord/v1/module/main/modules
*/
exports.getMainModules = async (req, res) => {
  // #swagger.tags = ['Module']

  const modules = await moduleService.getMainModules()

  if (!modules) {
    const message = 'Modules don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  return res.status(200).json({
    data: modules
  })
}
