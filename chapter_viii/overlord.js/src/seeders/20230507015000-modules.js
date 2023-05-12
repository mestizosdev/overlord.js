'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('adm_modules', [{
      name: 'Main',
      icon: 'pi pi-fw pi-home'
    }], { returning: true })
      .then(async (module) => {
        module.forEach(value => {
          queryInterface.bulkInsert('adm_modules', [
            {
              name: 'Security',
              icon: 'pi pi-fw pi-lock',
              link: '/security/manage',
              module_id: value.id
            }
          ], { returning: true })
        })
      })

    const security = await queryInterface.sequelize.query(
      `select * from adm_modules
      where name = 'Security';`
    )

    await queryInterface.bulkInsert('adm_modules', [
      { name: 'Manage', module_id: security[0][0].id },
      { name: 'Transaction', module_id: security[0][0].id },
      { name: 'Report', module_id: security[0][0].id },
      { name: 'Parameter', module_id: security[0][0].id }
    ], { })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adm_modules', null, {})
    await queryInterface.bulkDelete('adm_roles', null, {})
  }
}
