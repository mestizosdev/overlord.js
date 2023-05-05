/** @module controllers/remove-user */
const userService = require('../services')

/**
 * @name Delete user
 * @path {DELETE} /overlord/v1/user/:id
*/
exports.remove = async (req, res) => {
  // #swagger.tags = ['User']
  const user = await userService.getById(req.params.id)

  if (!user) {
    return res.status(404).json({
      message: 'User don\'t exist'
    })
  }

  await userService.remove(user)

  return res.status(200).json({
    id: user.id,
    description: user.username
  })
}
