/** @module access/services/get-access-by-id */
const db = require('../../models')

/**
 * Get access by id
 *
 * @async
 * @param {number} getById - Access Id
 * @returns {Access} access
*/
exports.getById = async (id) => {
  const access = await db.Access.findOne({
    where: { id }
  })

  if (access) {
    return access
  }
}
