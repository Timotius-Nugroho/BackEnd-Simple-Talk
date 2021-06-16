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
  '/delete-photo/:id',
  authMiddleware.authentication,
  userController.userDeleteProfile
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  uploadFile,
  userController.userUpdate
)
Route.patch(
  '/change/password',
  authMiddleware.authentication,
  userController.userChangePassword
)

module.exports = Route
