'use strict'
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sql = fs.readFileSync('./src/sql/tg_user_access.sql').toString()
    await queryInterface.sequelize.query(sql)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize
      .query('DROP TRIGGER tg_user_access ON adm_users;')
  }
}
