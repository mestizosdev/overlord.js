/** @module module/services/get-module-by-id */
const db = require('../../models')

/**
 * Get module
 *
 * @async
 * @param {number} getById - Module Id
 * @returns {Module} module
*/
exports.getById = async (moduleId) => {
  const module = await db.ModuleView.findOne({
    where: { id: moduleId }
  })

  if (module) {
    return module
  }
}
