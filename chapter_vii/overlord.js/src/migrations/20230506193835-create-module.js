'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('adm_modules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
        references: {
          model: 'adm_roles',
          key: 'name',
          as: 'role'
        }
      },
      icon: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      observation: {
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      moduleId: {
        type: Sequelize.INTEGER,
        field: 'module_id',
        references: {
          model: 'adm_modules',
          key: 'id',
          as: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('adm_modules', {
      cascade: true
    })
  }
}
