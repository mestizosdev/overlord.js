/** @module controllers/update-user */
const userService = require('../services')

/**
 * @name Update user
 * @path {PUT} /overlord/v1/user/:id
*/
exports.update = async (req, res) => {
  const user = await userService.getById(req.params.id)

  if (!user) {
    return res.status(404).json({
      message: 'User don\'t exist'
    })
  }

  const { username, email, password, status } = req.body

  const userUpdated = await userService.update(
    user,
    { username, email, password, status }
  )

  return res.status(200).json({
    id: userUpdated.id,
    username: userUpdated.username,
    email: userUpdated.email,
    createdAt: userUpdated.createdAt,
    status: userUpdated.status
  })
}
