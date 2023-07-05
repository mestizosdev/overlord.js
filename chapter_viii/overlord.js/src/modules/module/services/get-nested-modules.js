/** @module module/services/get-module-by-id */
const { QueryTypes } = require('sequelize')

const db = require('../../../models')

/**
 * Get nested modules
 *
 * @async
 * @returns {JSON} json
*/
exports.getNestedModules = async () => {
  const nestedJson = await db.sequelize
    .query('SELECT fun_tree_module() as json',
      {
        type: QueryTypes.SELECT
      })

  if (nestedJson) {
    return nestedJson
  }
}
