const connection = require('../../config/mysql')

module.exports = {
  getAllDataByUserId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM contact WHERE contact_user_id = ?',
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
        'SELECT * FROM contact WHERE contact_user_id = ? AND contact_friend_id = ?',
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

  addData: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO contact SET ?', data, (error, result) => {
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
  },

  deleteData: (userId, friendId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM contact WHERE contact_user_id = ? AND contact_friend_id = ?',
        [userId, friendId],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
