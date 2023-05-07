const { create } = require('./create-role')
const { getByName } = require('./get-role-by-name')
const { update } = require('./update-role')
const { remove } = require('./remove-role')

module.exports = { create, getByName, update, remove }
