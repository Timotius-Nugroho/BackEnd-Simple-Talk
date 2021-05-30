const connection = require('../../config/mysql')

module.exports = {
  getAllDataByRoomId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM chat WHERE room_chat = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  addData: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat SET ?', data, (error, result) => {
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
