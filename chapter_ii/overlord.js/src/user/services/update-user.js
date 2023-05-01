const passwordUtil = require('../../utils/password')

exports.update = async (userToUpdate, userWithNewData) => {
  console.log(`userToUpdate: ${userToUpdate}`)
  console.log(`userWithNewData: ${userWithNewData}`)

  return await userToUpdate.update({
    username: userWithNewData.username,
    email: userWithNewData.email,
    password: await passwordUtil.encrypt(userWithNewData.password),
    status: userWithNewData.status
  })
}
