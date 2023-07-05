/** @module role/controllers/create-role */
const { validationResult } = require('express-validator')

const roleService = require('../services')
const { errorMessage } = require('../../utils/error-message')
const register = require('./helpers/is-role-register')

/**
 * @name Create role
 * @path {POST} /overlord/v1/role
 */
exports.create = async (req, res) => {
  // #swagger.tags = ['Role']
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json(
        errorMessage(errors, req)
      )
    }

    const { name, observation } = req.body

    const isRoleExist = await register.isRoleRegister(name, observation)

    if (isRoleExist.exist) {
      return res.status(404).json(
        errorMessage(isRoleExist.message, req)
      )
    }

    const role = await roleService.create(
      { name, observation }
    )

    res.status(200).json({
      id: role.id,
      name,
      observation
    })
  } catch (error) {
    return res.status(503).json(
      errorMessage(error, req)
    )
  }
}
