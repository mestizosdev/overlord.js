const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const colors = require('colors')

const app = require('../src/app')

chai.use(chaiHttp)

const urlBase = '/overlord/v1/'
const root = 'root'
let rootId = 0
let childId = 0
const child = 'child'

describe('Module'.bgBlue, () => {
  
  describe('POST root module'.cyan, () => {
    it('It should POST a root module', (done) => {
      const module = {
        name: root,
        observation: root
      }

      chai.request(app)
        .post(`${urlBase}module`)
        .send(module)
        .end((err, res) => {
          res.should.have.status(200)
          rootId = res.body.id
          console.log('Create module:'.blue.bold, res.body)
          done()
        })
    })
  })

  describe('POST child module'.cyan, () => {
    it('It should POST a child module', (done) => {
      const module = {
        name: child,
        observation: child,
        moduleId: rootId
      }

      chai.request(app)
        .post(`${urlBase}module`)
        .send(module)
        .end((err, res) => {
          res.should.have.status(200)
          childId = res.body.id
          console.log('Create module:'.blue.bold, res.body)
          done()
        })
    })
  })

  describe('DELETE module'.cyan, () => {
    it('It should DELETE a child module', (done) => {
      chai.request(app)
        .delete(`${urlBase}module/` + childId)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Delete module:'.blue.bold, res.body)
          done()
        })
    })
    it('It should DELETE a root module', (done) => {
      chai.request(app)
        .delete(`${urlBase}module/` + rootId)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Delete module:'.blue.bold, res.body)
          done()
        })
    })
  })
})

