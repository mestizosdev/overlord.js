/** @module module/services/get-main-modules */
const db = require('../../../models')

/**
 * Get main modules
 *
 * @async
 * @returns {Module} module
*/
exports.getMainModules = async () => {
  const module = await db.ModuleView.findAll({
    attributes: ['id', 'name', 'path', 'moduleId', 'status'],
    where: {
      level: 2
    }
  })

  if (module) {
    return module
  }
}
