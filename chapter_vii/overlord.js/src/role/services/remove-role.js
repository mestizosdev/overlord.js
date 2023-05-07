/** @module role/services/remove-role */

/**
 * Delete role
 *
 * @async
 * @param {Role} remove - Current role to delete
*/
exports.remove = async (role) => {
  await role.destroy()
}
