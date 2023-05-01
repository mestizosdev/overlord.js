const { create } = require('./create-user')
const { update } = require('./update-user')
const { remove } = require('./remove-user')
const { getById } = require('./get-user-by-id')

module.exports = { create, getById, update, remove }
