const express = require('express')
const router = express.Router()
const { param, body } = require('express-validator')

const { getById, create, update, remove } = require('./controllers/index')

router.get('/overlord/v1/user/:id',
  param('id').toInt().notEmpty()
    .withMessage('Should have a numeric identifier'),
  getById)

router.post('/overlord/v1/user',
  body('username')
    .not().isEmpty()
    .withMessage('Should have a username')
    .isLength(2)
    .withMessage('The username should have a more letters')
    .custom(value => !/\s/.test(value))
    .withMessage('The username not should have a blank spaces'),
  body('email').isEmail()
    .withMessage('Should have a valid email'),
  create)

router.put('/overlord/v1/user/:id',
  param('id').toInt().notEmpty()
    .withMessage('Should have a numeric identifier'),
  body('username')
    .not().isEmpty()
    .withMessage('Should have a username')
    .isLength(2)
    .withMessage('The username should have a more letters')
    .custom(value => !/\s/.test(value))
    .withMessage('The username not should have a blank spaces'),
  body('status').isBoolean(true)
    .withMessage('Should have a true or false in status'),
  body('email').isEmail()
    .withMessage('Should have a valid email'),
  update)

router.delete('/overlord/v1/user/:id',
  param('id').toInt().notEmpty()
    .withMessage('Should have a numeric identifier'),
  remove)

module.exports = router
