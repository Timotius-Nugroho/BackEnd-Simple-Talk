const helper = require('../../helpers')
const chatRoomModel = require('./chat_room_model')

module.exports = {
  getAllRoom: async (req, res) => {
    try {
      const { id } = req.params
      const result = await chatRoomModel.getAllDataByUserId(id)

      for (const friend of result) {
        friend.friendDetail = await chatRoomModel.getFriendDataById(
          friend.friend_id
        )
        friend.sampleChat = await chatRoomModel.getSampleChatByRoomId(
          friend.room_chat
        )
        delete friend.friendDetail.user_id
        delete friend.friendDetail.user_password
      }

      return helper.response(res, 200, 'Succes get all room !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  addRoom: async (req, res) => {
    try {
      const { userId, friendId } = req.body
      const checkRoomUser = await chatRoomModel.getDataByUserAndFriendId(
        userId,
        friendId
      )
      const checkRoomFriend = await chatRoomModel.getDataByUserAndFriendId(
        friendId,
        userId
      )

      if (checkRoomUser.length > 0 || checkRoomFriend.length > 0) {
        return helper.response(res, 404, 'Room has been added !', null)
      }

      const roomChat = Math.floor(Math.random() * 10000 + 1)

      let result = await chatRoomModel.addData({
        user_id: friendId,
        friend_id: userId,
        room_chat: roomChat
      })
      result = await chatRoomModel.addData({
        user_id: userId,
        friend_id: friendId,
        room_chat: roomChat
      })
      return helper.response(res, 200, 'Succes add new room !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
