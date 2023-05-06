const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const { create } = require('./controllers/index')

router.post('/overlord/v1/role',
  body('name')
    .not().isEmpty()
    .withMessage('Should have a role name')
    .isLength(2)
    .withMessage('The username should have a more letters')
    .custom(value => !/\s/.test(value))
    .withMessage('The role name not should have a blank spaces'),
  create)

module.exports = router
