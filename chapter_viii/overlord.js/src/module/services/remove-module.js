/** @module module/services/remove-module */

/**
 * Delete module
 *
 * @async
 * @param {Module} remove - Current role to delete
*/
exports.remove = async (module) => {
  await module.destroy()
}
