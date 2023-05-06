'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    static associate (models) {
      Module.belongsTo(models.Role, {
        targetKey: 'name',
        foreignKey: 'role',
        as: 'role'
      })
      Module.hasMany(models.Module, {
        sourceKey: 'id',
        foreignKey: 'module_id',
        as: 'model'
      })
      // Module.hasMany(models.Access, {
      // sourceKey: 'id',
      // foreignKey: 'module_id',
      // as: 'access'
      // })
    }
  }
  Module.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    icon: DataTypes.STRING,
    link: DataTypes.STRING,
    observation: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    moduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Module',
    underscored: true,
    timestamps: false,
    tableName: 'adm_modules'
  })
  return Module
}
