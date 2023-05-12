/** @module module/services/get-module-view-by-id */
const db = require('../../models')

/**
 * Get module view
 *
 * @async
 * @param {number} getById - Module Id
 * @returns {ModuleView} moduleView
*/
exports.getViewById = async (id) => {
  const moduleView = await db.ModuleView.findOne({
    where: { id }
  })

  if (moduleView) {
    return moduleView
  }
}
