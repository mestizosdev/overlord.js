/** @module role/controllers/get-role-by-name */
const { validationResult } = require('express-validator')

const roleService = require('../services')
const { errorMessage } = require('../../utils/error-message')
/**
 * @name Get role by name
 * @path {GET} /overlord/v1/role/:name
*/
exports.getByName = async (req, res) => {
  // #swagger.tags = ['Role']
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errors, req)
    )
  }

  const role = await roleService.getByName(req.params.name)

  if (!role) {
    const message = 'Role don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  res.status(200).json({
    id: role.id,
    name: role.name,
    observation: role.observation,
    status: role.status
  })
}
