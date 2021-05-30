const express = require('express')
const Route = express.Router()
const authRouter = require('../modules/auth/auth_routes')
const userRouter = require('../modules/user/user_routes')
const chatRoomRouter = require('../modules/chat_room/chat_room_routes')
const chatRouter = require('../modules/chat/chat_routes')
const contactRouter = require('../modules/contact/contact_routes')

Route.use('/auth', authRouter)
Route.use('/user', userRouter)
Route.use('/chat-room', chatRoomRouter)
Route.use('/chat', chatRouter)
Route.use('/contact', contactRouter)

module.exports = Route
