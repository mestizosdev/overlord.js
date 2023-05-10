/** @module authentication/controllers/login */
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const passwordUtil = require('../../utils/password')
const userService = require('../../user/services')
const roleService = require('../services')
const { errorMessage } = require('../../utils/error-message')
/**
 * @name Login
 * @path {POST} /overlord/v1/login
*/
exports.login = async (req, res) => {
  // #swagger.tags = ['Authentication']
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errors, req)
    )
  }

  const { username, password } = req.body

  const user = await userService.getByUsername(username)

  if (!user) {
    return res.status(404).json(
      errorMessage('Invalid credentials', req)
    )
  }

  const isMatch = await passwordUtil.compare(password, user.password)

  if (!isMatch) {
    return res.status(404).json(
      errorMessage('Invalid credentials', req)
    )
  }

  const roles = await roleService.getByUserId(user.id)

  // Convert roles query in array
  const roleArray = []
  for (const i in roles) {
    roleArray.push(roles[i].rolename)
  }

  try {
    const token = jwt.sign(
      {
        username: user.username,
        status: user.status,
        roles: roleArray
      }
      , process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
      })

    return res.status(200).json({
      token
    })
  } catch (err) {
    return res.status(501).json(
      errorMessage('JWT error', req)
    )
  }
}
