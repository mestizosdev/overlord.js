exports.remove = async (user) => {
  await user.destroy()
}
