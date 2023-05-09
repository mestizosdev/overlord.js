const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const colors = require('colors')

const app = require('../src/app')

chai.use(chaiHttp)

const urlBase = '/overlord/v1/'
const roleName = 'any'

describe('Role'.bgBlue, () => {
  
  describe('POST role'.cyan, () => {
    it('It should POST a role', (done) => {
      const role = { 
        name: roleName 
      }

      chai.request(app)
        .post(`${urlBase}role`)
        .send(role)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Create role:'.blue.bold, res.body)
          done()
        })
    })
  })
    
  describe('POST duplicate role'.cyan, () => {
    it('It should reject POST role', (done) => {
      const role = { 
        name: roleName 
      }

      chai.request(app)
        .post(`${urlBase}role`)
        .send(role)
        .end((err, res) => {
          res.should.have.status(404)
          console.log('Reject role:'.blue.bold, res.body)
          done()
        })
    })
  })

  describe('PUT role'.cyan, () => {
    it('it should PUT a role', (done) => {
      const role = {
        observation: 'other',
        status: false
      }

      chai.request(app)
        .put(`${urlBase}role/` + roleName)
        .send(role)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Update role:'.blue.bold, res.body)
          done()
        })
    })
  })

  describe('GET role'.cyan, () => {
    it('it should GET a role', (done) => {
      console.log('User Id:'.blue, `${urlBase}role/` + roleName)
      chai.request(app)
        .get(`${urlBase}role/` + roleName)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Get role:'.blue.bold, res.body)
          done()
        })
    })
  })
  
  describe('DELETE role'.cyan, () => {
    it('It should DELETE a role', (done) => {
      chai.request(app)
        .delete(`${urlBase}role/` + roleName)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Delete role:'.blue.bold, res.body)
          done()
        })
    })
  })
})

