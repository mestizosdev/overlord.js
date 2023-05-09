'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const security = await queryInterface.sequelize.query(
      `select * from v_adm_modules
      where parent = 'Security'
      and name = 'Transaction';`
    )

    await queryInterface.bulkInsert('adm_roles', [{
      name: 'password',
      observation: 'Change password'
    }, {
      name: 'access',
      observation: 'Access'
    }], {})

    await security[0].forEach(value => {
      queryInterface.bulkInsert('adm_modules', [
        { name: 'Change Password', role: 'password', module_id: value.id },
        { name: 'Access', role: 'access', module_id: value.id }
      ], { })
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adm_modules', null, {})
  }
}
