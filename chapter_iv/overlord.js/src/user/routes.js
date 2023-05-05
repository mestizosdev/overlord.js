const express = require('express')
const { getById, create, update, remove } = require('./controllers/index')

const router = express.Router()

router.get('/overlord/v1/user/:id', getById)
router.post('/overlord/v1/user', create)
router.put('/overlord/v1/user/:id', update)
router.delete('/overlord/v1/user/:id', remove)

module.exports = router
