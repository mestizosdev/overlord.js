/** @module access/services/update-access */
const db = require('../../models')

/**
 * Update access
 *
 * @async
 * @param {Access} access - Current user to update
 * @returns {User}
 */
exports.update = async (access) => {
  const roleModule = await db.Module.findOne({
    attributes: ['role'],
    where: { id: access.moduleId }
  })

  return roleModule
}
