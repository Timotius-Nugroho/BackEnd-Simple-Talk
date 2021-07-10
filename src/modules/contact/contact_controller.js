const helper = require('../../helpers')
const contactModel = require('./contact_model')

module.exports = {
  getAllContact: async (req, res) => {
    try {
      const { id } = req.params
      const result = await contactModel.getAllDataByUserId(id)

      for (const contact of result) {
        contact.detail = await contactModel.getFriendDataById(
          contact.contact_friend_id
        )
        if (contact.detail) {
          delete contact.detail.user_id
          delete contact.detail.user_password
        }
      }
      return helper.response(res, 200, 'Succes get all user !', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  addContact: async (req, res) => {
    try {
      const { contactUserId, contactFriendId } = req.body

      if (contactUserId === contactFriendId) {
        return helper.response(res, 404, 'cant add contact !', null)
      }

      const checkContact = await contactModel.getDataByUserAndFriendId(
        contactUserId,
        contactFriendId
      )

      if (checkContact.length > 0) {
        return helper.response(res, 404, 'contact has been added !', null)
      }

      const result = await contactModel.addData({
        contact_user_id: contactUserId,
        contact_friend_id: contactFriendId
      })
      return helper.response(res, 200, 'Succes add new contact !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteContact: async (req, res) => {
    try {
      const { contactUserId, contactFriendId } = req.query
      const checkContact = await contactModel.getDataByUserAndFriendId(
        contactUserId,
        contactFriendId
      )

      if (checkContact.length === 0) {
        return helper.response(res, 404, 'contact not found !', null)
      }

      const result = await contactModel.deleteData(
        contactUserId,
        contactFriendId
      )
      return helper.response(res, 200, 'Succes delete contact !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
