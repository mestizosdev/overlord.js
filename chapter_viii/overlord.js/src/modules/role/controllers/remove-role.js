/** @module role/controllers/remove-role */
const roleService = require('../services')

const { validationResult } = require('express-validator')

const { errorMessage } = require('../../utils/error-message')
/**
 * @name Delete role
 * @path {DELETE} /overlord/v1/role/:id
*/
exports.remove = async (req, res) => {
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

  await roleService.remove(role)

  return res.status(200).json({
    id: role.id,
    description: role.name
  })
}
