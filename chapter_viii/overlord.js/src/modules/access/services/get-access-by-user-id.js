/** @module access/services/get-access-by-user-id */
const db = require('../../../models')

/**
 * Get access
 *
 * @async
 * @param {integer} userId
 * @returns {Object} access
*/
exports.getByUserId = async (userId) => {
  const access = await db.Access.findAll(
    {
      attributes:
          ['id',
            'read',
            'create',
            'modify',
            'delete',
            'status'],
      where: { user_id: userId },
      include: [
        {
          model: db.ModuleView,
          as: 'moduleView',
          required: true,
          attributes: ['id', 'path']
        }
      ]
    }
  )

  const accessArray = []
  for (const i in access) {
    const a = {
      id: access[i].id,
      read: access[i].read,
      create: access[i].create,
      modify: access[i].modify,
      delete: access[i].delete,
      username: access[i].username,
      status: access[i].status,
      moduleId: access[i].moduleView.id,
      path: access[i].moduleView.path
    }
    accessArray.push(a)
  }

  return {
    count: access.length,
    data: accessArray
  }
}
