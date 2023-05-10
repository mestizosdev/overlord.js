const { getById } = require('./get-module-by-id')
const { getMainModules } = require('./get-main-modules')
const { getNestedModules } = require('./get-nested-modules')
const { create } = require('./create-module')

module.exports = { getById, getMainModules, getNestedModules, create }
