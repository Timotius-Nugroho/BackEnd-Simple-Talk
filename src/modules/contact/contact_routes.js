const express = require('express')
const Route = express.Router()
const contactController = require('./contact_controller')
const authMiddleware = require('../../middleware/auth')

Route.get(
  '/:id',
  authMiddleware.authentication,
  contactController.getAllContact
)
Route.post('/', authMiddleware.authentication, contactController.addContact)
Route.delete(
  '/',
  authMiddleware.authentication,
  contactController.deleteContact
)

module.exports = Route
