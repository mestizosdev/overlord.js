const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const { login } = require('./controllers/index')

// Login user
router.post('/overlord/v1/login',
  body('username')
    .not().isEmpty()
    .withMessage('Username is required'),
  body('password')
    .not().isEmpty()
    .withMessage('Password is required'),
  login)

module.exports = router
