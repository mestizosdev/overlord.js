const express = require('express')
const { getById, create } = require('./controllers')

const router = express.Router()

router.get('/overlord/v1/user/:id', getById)
router.post('/overlord/v1/user', create)

module.exports = router
