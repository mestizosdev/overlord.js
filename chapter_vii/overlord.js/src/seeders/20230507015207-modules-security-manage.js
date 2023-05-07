'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const security = await queryInterface.sequelize.query(
      `select * from v_adm_modules
      where parent = 'Security'
      and name = 'Manage';`
    )

    await queryInterface.bulkInsert('adm_roles', [{
      name: 'user',
      observation: 'Manage users'
    }, {
      name: 'module',
      observation: 'Manage modules'
    }], {})

    await security[0].forEach(value => {
      queryInterface.bulkInsert('adm_modules', [
        { name: 'Users', role: 'user', module_id: value.id },
        { name: 'Modules', role: 'module', module_id: value.id }
      ], { })
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adm_modules', null, {})
  }
}
