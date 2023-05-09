'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const security = await queryInterface.sequelize.query(
      `select * from v_adm_modules
      where parent = 'Security'
      and name = 'Report';`
    )

    await queryInterface.bulkInsert('adm_roles', [{
      name: 'rep_list_user',
      observation: 'Report list user'
    }], {})

    await security[0].forEach(value => {
      queryInterface.bulkInsert('adm_modules', [
        { name: 'List of Users', role: 'rep_list_user', module_id: value.id }
      ], { })
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adm_modules', null, {})
  }
}
