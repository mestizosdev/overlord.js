'use strict'
const passwordUtil = require('../utils/password')

const password = 'HastaLaVista88'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const result = await queryInterface.bulkInsert('adm_users', [{
      username: 'system',
      password: await passwordUtil.encrypt(password),
      email: 'friend@mestizos.dev',
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    }], { returning: true })

    await queryInterface.bulkInsert('adm_roles', [{
      name: 'super',
      observation: 'Access all modules',
      status: true
    }], {})

    await result.forEach(value => {
      queryInterface.bulkInsert('adm_user_roles', [
        { user_id: value.id, role: 'super' }
      ], { })
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adm_users', null, {})
    await queryInterface.bulkDelete('adm_roles', null, {})
  }
}
