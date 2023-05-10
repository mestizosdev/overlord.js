'use strict'
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sql = fs.readFileSync('./src/sql/fun_create_module.sql').toString()
    await queryInterface.sequelize.query(sql)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize
      .query('DROP FUNCTION fun_create_module;')
  }
}
