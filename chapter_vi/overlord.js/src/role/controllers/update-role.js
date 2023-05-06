/** @module role/controllers/update-role */
const { validationResult } = require('express-validator')

const roleService = require('../services')
const { errorMessage } = require('../../utils/error-message')
const register = require('./helpers/is-role-register')

/**
 * @name Update role
 * @path {PUT} /overlord/v1/role/:name
*/
exports.update = async (req, res) => {
  // #swagger.tags = ['Role']
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json(
        errorMessage(errors, req)
      )
    }

    const roleName = req.params.name
    const role = await roleService.getByName(roleName)

    if (!role) {
      return res.status(404).json(
        errorMessage('Role don\'t exist', req)
      )
    }

    const { status } = req.body

    const isRoleExist = await register.isRoleRegister(roleName)

    if (isRoleExist.exist) {
      return res.status(404).json(
        errorMessage(isRoleExist.message, req)
      )
    }

    const roleUpdated = await roleService.update(role, status)

    res.status(200).json({
      id: roleUpdated.id,
      name: roleUpdated.name,
      status: roleUpdated.status
    })
  } catch (error) {
    return res.status(503).json(
      errorMessage(error, req)
    )
  }
}
