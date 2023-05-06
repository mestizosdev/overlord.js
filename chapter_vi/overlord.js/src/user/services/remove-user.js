/** @module user/services/remove-user */

/**
 * Delete user
 *
 * @async
 * @param {User} remove - Current user to delete
*/
exports.remove = async (user) => {
  await user.destroy()
}
