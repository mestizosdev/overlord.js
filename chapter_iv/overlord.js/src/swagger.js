const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '/config/config.env') })

const PORT = process.env.PORT || 5000

const doc = {
  info: {
    version: '1.0.0',
    title: 'Overlord.js'
  },
  host: `localhost:${PORT}`
}

const outputFile = '../swagger.json'
const endpointsFiles = ['src/routes/version.js', 'src/routes/user.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
