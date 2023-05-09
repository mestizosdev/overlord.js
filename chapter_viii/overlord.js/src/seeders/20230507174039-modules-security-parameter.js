'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const security = await queryInterface.sequelize.query(
      `select * from v_adm_modules
      where parent = 'Security'
      and name = 'Parameter';`
    )

    await queryInterface.bulkInsert('adm_roles', [{
      name: 'role',
      observation: 'Roles'
    }], {})

    await security[0].forEach(value => {
      queryInterface.bulkInsert('adm_modules', [
        { name: 'Role', role: 'role', module_id: value.id }
      ], { })
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adm_modules', null, {})
  }
}
