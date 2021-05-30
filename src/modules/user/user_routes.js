const express = require('express')
const Route = express.Router()
const userController = require('./user_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

Route.get('/', authMiddleware.authentication, userController.getAllUser)
Route.get(
  '/by-id/:id',
  authMiddleware.authentication,
  userController.getUserById
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  uploadFile,
  userController.userUpdate
)

module.exports = Route
