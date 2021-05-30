const helper = require('../../helpers')
const chatModel = require('./chat_model')

module.exports = {
  readChat: async (req, res) => {
    try {
      const { id } = req.params
      const result = await chatModel.getAllDataByRoomId(id)
      return helper.response(res, 200, 'Succes read chat !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  addChat: async (req, res) => {
    try {
      const setData = {}
      for (const [key, value] of Object.entries(req.body)) {
        setData[helper.convertToSnakeCase(key)] = value
      }
      // console.log(setData)
      const result = await chatModel.addData(setData)
      return helper.response(res, 200, 'Succes add chat !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
