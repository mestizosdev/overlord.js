const express = require('express')
const router = express.Router()
const { param } = require('express-validator')

const { getByUserId } = require('./controllers/index')

router.get('/overlord/v1/access/:userId',
  param('userId').notEmpty()
    .withMessage('Should have a value'),
  getByUserId)

module.exports = router
