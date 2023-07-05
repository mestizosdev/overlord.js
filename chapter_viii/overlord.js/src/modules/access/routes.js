const express = require('express')
const router = express.Router()
const { param } = require('express-validator')

const { getByUserId, update } = require('./controllers/index')

router.get('/overlord/v1/access/user/:userId',
  param('userId').toInt().notEmpty()
    .withMessage('Should have a value'),
  getByUserId)

router.put('/overlord/v1/access/:id',
  param('id').toInt().notEmpty()
    .withMessage('Should have a value'),
  update
)

module.exports = router
