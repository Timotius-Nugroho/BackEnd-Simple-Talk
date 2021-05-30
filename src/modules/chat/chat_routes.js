const express = require('express')
const Route = express.Router()
const chatController = require('./chat_controller')
const authMiddleware = require('../../middleware/auth')

Route.get('/:id', authMiddleware.authentication, chatController.readChat)
Route.post('/', authMiddleware.authentication, chatController.addChat)

module.exports = Route
