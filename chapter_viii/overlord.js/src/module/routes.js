const express = require('express')
const router = express.Router()
const { param } = require('express-validator')

const { getById } = require('./controllers/index')

router.get('/overlord/v1/module/:id',
  param('id').toInt().notEmpty()
    .withMessage('Should have a numeric identifier'),
  getById)

module.exports = router
