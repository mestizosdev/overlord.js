/** @module models/userrole */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate (models) {
      UserRole.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'user_id',
        as: 'user'
      })
      UserRole.belongsTo(models.Role, {
        targetKey: 'name',
        foreignKey: 'role',
        as: 'roleName'
      })
    }
  }
  UserRole.init({
    userId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserRole',
    underscored: true,
    timestamps: false,
    tableName: 'adm_user_roles'
  })
  return UserRole
}
