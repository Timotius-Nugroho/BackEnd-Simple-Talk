const connection = require('../../config/mysql')

module.exports = {
  getAllData: (keywords) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_email LIKE ?',
        keywords,
        (error, result) => {
          if (!error) {
            if (result.length === 0) {
              resolve([{}])
            } else {
              resolve(result)
            }
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  updateData: (id, setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
