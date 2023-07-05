/** @module models/accessview */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AccessView extends Model {
    static associate (models) {
      AccessView.hasMany(models.AccessView, {
        targetKey: 'id',
        foreignKey: 'parent_id',
        as: 'accessDetail'
      })
    }
  }
  AccessView.init({
    name: DataTypes.STRING,
    parent: DataTypes.STRING,
    path: DataTypes.STRING,
    level: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AccessView',
    underscored: true,
    timestamps: false,
    tableName: 'v_adm_access'
  })
  return AccessView
}
