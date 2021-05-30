const connection = require('../../config/mysql')

module.exports = {
  getAllDataByUserId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM room_chat WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataByUserAndFriendId: (userId, friendId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM room_chat WHERE user_id = ? AND friend_id = ?',
        [userId, friendId],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getFriendDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result[0]) : reject(new Error(error))
        }
      )
    })
  },

  getSampleChatByRoomId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT message, created_at FROM chat WHERE room_chat = ? ORDER BY created_at DESC LIMIT 1',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  addData: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO room_chat SET ?', data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
