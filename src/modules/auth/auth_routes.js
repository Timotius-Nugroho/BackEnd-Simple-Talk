const express = require('express')
const Route = express.Router()
const authController = require('./auth_controller')

Route.get('/change-data/:token', authController.changeData)
Route.post('/request-change-password', authController.requestChangePassword)

Route.post('/login', authController.login)
Route.post('/logout/:id', authController.logout)
Route.post('/register', authController.register)

module.exports = Route
