const express = require('express')
const Route = express.Router()
const chatRoomController = require('./chat_room_controller')
const authMiddleware = require('../../middleware/auth')

Route.get('/:id', authMiddleware.authentication, chatRoomController.getAllRoom)
Route.post('/', authMiddleware.authentication, chatRoomController.addRoom)

module.exports = Route
