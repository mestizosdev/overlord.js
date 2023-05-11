const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '/config/config.env') })

const PORT = process.env.PORT

const doc = {
  info: {
    version: '1.0.0',
    title: 'Overlord.js'
  },
  host: `localhost:${PORT}`
}

const outputFile = '../swagger.json'
const endpointsFiles = [
  'src/user/routes.js',
  'src/role/routes.js',
  'src/module/routes.js',
  'src/access/routes.js',
  'src/authentication/routes.js',
  'src/version/routes.js'
]

swaggerAutogen(outputFile, endpointsFiles, doc)
