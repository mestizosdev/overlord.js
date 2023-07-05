/** @module module/services/create-module */
const db = require('../../../models')

/**
 * Create module
 *
 * @async
 * @param {Module} create - Module to create
 * @returns {Module} module
 */
exports.create = async (moduleNew) => {
  const module = db.Module.build({
    name: moduleNew.name,
    observation: moduleNew.observation,
    moduleId: moduleNew.moduleId
  })

  return await module.save()
}
