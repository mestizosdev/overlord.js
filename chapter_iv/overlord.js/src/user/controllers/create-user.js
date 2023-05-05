/** @module controllers/create-user */
const userService = require('../services')
const passwordUtil = require('../../utils/password')

/**
 * @name Create user
 * @path {POST} /overlord/v1/user
*/
exports.create = async (req, res) => {
  // #swagger.tags = ['User']
  console.log(req.body)
  const { username, email, password } = req.body

  const userExist = await userService.getByUsername(username)

  if (userExist) {
    return res.status(404).json({
      message: `User cannot be created, the username ${username} already exist`
    })
  }

  // Conditional operator or ternary operator
  // condition ? exprIfTrue : exprIfFalse
  const passwordToSave = (typeof password !== 'undefined' &&
    password !== null)
    ? password
    : passwordUtil.generate()

  console.log(`passwordToSave: ${passwordToSave}`)

  const user = await userService.create({ username, email, password: passwordToSave })

  return res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    status: user.status
  })
}
