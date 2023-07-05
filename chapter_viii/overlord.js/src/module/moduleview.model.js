/** @module models/moduleview */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ModuleView extends Model {
    static associate (models) {
      ModuleView.belongsTo(models.ModuleView, {
        targetKey: 'id',
        foreignKey: 'module_id',
        as: 'moduleview'
      })
      ModuleView.hasMany(models.Access, {
        sourceKey: 'id',
        foreignKey: 'module_id',
        as: 'access'
      })
    }
  }
  ModuleView.init({
    name: DataTypes.STRING,
    parent: DataTypes.STRING,
    path: DataTypes.STRING,
    role: DataTypes.STRING,
    level: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    link: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    moduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ModuleView',
    underscored: true,
    timestamps: false,
    tableName: 'v_adm_modules'
  })
  return ModuleView
}
