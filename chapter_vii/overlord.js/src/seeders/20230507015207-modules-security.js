'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /*
    const main = await queryInterface.sequelize.query(
      `select * from adm_modules
      where name = 'Main';`
    )

    console.log(main)

    const security = await queryInterface.bulkInsert('adm_modules', [
      {
        name: 'Security',
        icon: 'pi pi-fw pi-lock',
        link: '/security/manage',
        module_id: main[0][0].id
      }
    ], { returning: true, count: 99 })

    await queryInterface.bulkInsert('adm_modules', [
      { name: 'Manage', module_id: security[0].id },
      { name: 'Transaction', module_id: security[0].id },
      { name: 'Report', module_id: security[0].id },
      { name: 'Parameter', module_id: security[0].id }
    ], { returning: true, count: 99 })
      .then(async (menu) => {
        menu.forEach(value => {
          console.log('value', value)
          if (value.name === 'Manage') {
            queryInterface.bulkInsert('adm_modules', [
              { name: 'Users', module_id: value.id },
              { name: 'Modules', module_id: value.id }
            ], { count: 100 })
          }
          if (value.name === 'Transaction') {
            queryInterface.bulkInsert('adm_modules', [
              { name: 'Users', module_id: value.id },
              { name: 'Modules', module_id: value.id }
            ], { count: 100 })
          }
          if (value.name === 'Report') {
            queryInterface.bulkInsert('adm_modules', [
              { name: 'Users', module_id: value.id },
              { name: 'Modules', module_id: value.id }
            ], { count: 100 })
          }
        })
      })
      */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adm_modules', null, {})
  }
}
