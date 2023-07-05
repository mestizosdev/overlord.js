'use strict'

const path = require('path')
const Sequelize = require('sequelize')
const process = require('process')
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/config.json'))[env]

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

const Access = require('../modules/access/access.model')(sequelize, Sequelize.DataTypes)
const AccessView = require('../modules/access/accessview.model')(sequelize, Sequelize.DataTypes)
const Module = require('../modules/module/module.model')(sequelize, Sequelize.DataTypes)
const ModuleView = require('../modules/module/moduleview.model')(sequelize, Sequelize.DataTypes)
const Role = require('../modules/role/role.model')(sequelize, Sequelize.DataTypes)
const User = require('../modules/user/user.model')(sequelize, Sequelize.DataTypes)
const UserRole = require('../modules/user/userrole.model')(sequelize, Sequelize.DataTypes)

const db = {
  Access,
  AccessView,
  Module,
  ModuleView,
  Role,
  User,
  UserRole
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
