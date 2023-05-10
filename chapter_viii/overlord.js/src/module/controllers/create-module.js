/** @module module/controllers/create-module */
const { validationResult } = require('express-validator')

const moduleService = require('../services')
const { errorMessage } = require('../../utils/error-message')

/**
 * @name Create module
 * @path {POST} /overlord/v1/module
 */
exports.create = async (req, res) => {
  // #swagger.tags = ['Module']
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json(
        errorMessage(errors, req)
      )
    }

    const { name, observation, moduleId } = req.body

    const module = await moduleService.create(
      { name, observation, moduleId }
    )

    res.status(200).json({
      id: module.id,
      name,
      observation,
      moduleId
    })
  } catch (error) {
    return res.status(503).json(
      errorMessage(error, req)
    )
  }
}
