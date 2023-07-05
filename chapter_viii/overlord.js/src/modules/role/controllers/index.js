const { create } = require('./create-role')
const { update } = require('./update-role')
const { remove } = require('./remove-role')
const { getByName } = require('./get-role-by-name')

module.exports = { create, getByName, update, remove }
