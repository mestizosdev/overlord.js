/** @module models/access */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Access extends Model {
    static associate (models) {
      Access.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'user_id',
        as: 'user'
      })
      Access.belongsTo(models.Module, {
        targetKey: 'id',
        foreignKey: 'module_id',
        as: 'module'
      })
    }
  }
  Access.init({
    read: DataTypes.BOOLEAN,
    create: DataTypes.BOOLEAN,
    modify: DataTypes.BOOLEAN,
    delete: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    moduleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Access',
    underscored: true,
    tableName: 'adm_access'
  })
  return Access
}
