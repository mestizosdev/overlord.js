const db = require('../../models')
const passwordUtil = require('../../utils/password')

exports.create = async (userNew) => {
  const user = db.User.build({
    username: userNew.username,
    email: userNew.email.toLowerCase(),
    password: await passwordUtil.encrypt(userNew.password),
    status: true
  })

  return await user.save()
}
