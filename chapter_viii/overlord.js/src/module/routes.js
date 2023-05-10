const express = require('express')
const router = express.Router()
const { param } = require('express-validator')

const { getById, getMainModules, getNestedModules } = require('./controllers/index')

router.get('/overlord/v1/module/:id',
  param('id').toInt().notEmpty()
    .withMessage('Should have a numeric identifier'),
  getById)

router.get('/overlord/v1/module/main/modules', getMainModules)

router.get('/overlord/v1/module/nested/modules', getNestedModules)

module.exports = router
