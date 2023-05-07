'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('adm_user_roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'adm_users',
          key: 'id',
          as: 'id'
        }
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'adm_roles',
          key: 'name',
          as: 'role'
        }
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('adm_user_roles')
  }
}
