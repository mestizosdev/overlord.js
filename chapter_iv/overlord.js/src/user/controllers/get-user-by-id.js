/** @module controllers/get-user-by-id */
const userService = require('../services')

/**
 * @name Get user by id
 * @path {GET} /overlord/v1/user/:id
*/
exports.getById = async (req, res) => {
  // #swagger.tags = ['User']
  const user = await userService.getById(req.params.id)

  if (!user) {
    return res.status(404).json({
      message: 'User don\'t exist'
    })
  }

  return res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    status: user.status
  })
}
