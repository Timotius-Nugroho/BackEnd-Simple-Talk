const helper = require('../../helpers')
const userModel = require('./user_model')

module.exports = {
  getAllUser: async (req, res) => {
    try {
      // console.log(req.query)
      let { keywords } = req.query
      keywords = '%' + keywords + '%' || '%%'
      console.log('KEY INI', keywords)
      const result = await userModel.getAllData(keywords)
      if (!result[0].user_id) {
        return helper.response(res, 200, 'No data found !', [])
      }
      return helper.response(res, 200, 'Succes get all user !', result)
    } catch (error) {
      // console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  getUserById: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      const result = await userModel.getDataById(id)
      delete result[0].user_password
      return helper.response(res, 200, 'Succes get by ID !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  userUpdate: async (req, res) => {
    try {
      // console.log(req.body, req.params)
      const { id } = req.params
      const checkUser = await userModel.getDataById(id)

      if (checkUser.length === 0) {
        return helper.response(
          res,
          404,
          `cannot update, data by id ${id} not found !`,
          null
        )
      }

      const setData = {}
      for (const [key, value] of Object.entries(req.body)) {
        setData[helper.convertToSnakeCase(key)] = value
      }
      setData.user_image = req.file
        ? req.file.filename
        : checkUser[0].user_image
      setData.user_updated_at = new Date(Date.now())
      // console.log(setData)

      if (req.file) {
        if (checkUser[0].user_image.length > 0) {
          console.log(`Delete Image${checkUser[0].user_image}`)
          const imgLoc = `src/uploads/${checkUser[0].user_image}`
          helper.deleteImage(imgLoc)
        } else {
          console.log('NO img in Uploads folder')
        }
      }

      const result = await userModel.updateData(id, setData)
      return helper.response(res, 200, 'Succes update data !', result)
    } catch (error) {
      // console.log('dari error', error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
