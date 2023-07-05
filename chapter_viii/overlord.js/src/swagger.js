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
  'src/modules/user/routes.js',
  'src/modules/role/routes.js',
  'src/modules/module/routes.js',
  'src/modules/access/routes.js',
  'src/modules/authentication/routes.js',
  'src/modules/version/routes.js'
]

swaggerAutogen(outputFile, endpointsFiles, doc)
