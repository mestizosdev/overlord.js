'use strict'
const passwordUtil = require('../utils/password')

const password = 'HastaLaVista88'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('adm_users', [{
      username: 'system',
      password: await passwordUtil.encrypt(password),
      email: 'friend@mestizos.dev',
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adm_users', null, {})
  }
}
