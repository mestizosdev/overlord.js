'use strict'
const passwordUtil = require('../utils/password')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = 'Mi_Secreto0'
    const result = await queryInterface.bulkInsert('adm_users', [{
      username: 'system',
      password: await passwordUtil.encrypt(password),
      email: 'friend@mestizos.dev',
      status: true
    },
    {
      username: 'default',
      password: await passwordUtil.encrypt(password),
      email: 'default@mestizos.dev',
      status: true
    }], { returning: true })

    await queryInterface.bulkInsert('adm_roles', [{
      name: 'super',
      observation: 'Access all modules',
      status: true
    }], {})

    await result.forEach(value => {
      if (value.username === 'system') {
        queryInterface.bulkInsert('adm_user_roles', [
          { user_id: value.id, role: 'super' }
        ], { })
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adm_users', null, {})
    // await queryInterface.bulkDelete('adm_roles', null, {})
    await queryInterface.bulkDelete('adm_user_roles', null, {})
  }
}
