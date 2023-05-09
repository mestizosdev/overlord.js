/** @module module/controllers/get-module-by-id */
const { validationResult } = require('express-validator')

const moduleService = require('../services')
const { errorMessage } = require('../../utils/error-message')
/**
 * @name Get module by id
 * @path {GET} /overlord/v1/module/:id
*/
exports.getById = async (req, res) => {
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

  return res.status(200).json({
    id: module.id,
    name: module.name,
    parent: module.parent,
    path: module.path,
    role: module.role,
    icon: module.icon,
    link: module.link,
    level: module.level,
    moduleId: module.moduleId,
    status: module.status
  })
}
