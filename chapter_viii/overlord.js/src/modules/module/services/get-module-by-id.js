/** @module module/services/get-module-by-id */
const db = require('../../../models')

/**
 * Get module view
 *
 * @async
 * @param {number} getById - Module Id
 * @returns {module} module
*/
exports.getById = async (id) => {
  const module = await db.Module.findOne({
    where: { id }
  })

  if (module) {
    return module
  }
}
