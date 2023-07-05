const { getById } = require('./get-module-by-id')
const { getMainModules } = require('./get-main-modules')
const { getNestedModules } = require('./get-nested-modules')
const { create } = require('./create-module')
const { remove } = require('./remove-module')

module.exports = { getById, getMainModules, getNestedModules, create, remove }
