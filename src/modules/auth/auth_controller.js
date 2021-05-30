const helper = require('../../helpers')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
const jwt = require('jsonwebtoken')

module.exports = {
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getDataCondition({
        user_email: userEmail
      })
      if (checkEmailUser.length > 0) {
        if (checkEmailUser[0].user_verification === '0') {
          return helper.response(res, 403, 'Account is not verified')
        }
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )
        if (checkPassword) {
          console.log('User berhasil login')
          const payload = {
            user_id: checkEmailUser[0].user_id,
            user_name: checkEmailUser[0].user_name
          }
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '24h'
          })
          const result = { ...payload, token }
          await authModel.updateData(
            { user_is_online: 1 },
            checkEmailUser[0].user_id
          )
          return helper.response(res, 200, 'Succes Login !', result)
        } else {
          return helper.response(res, 400, 'Worng password')
        }
      } else {
        return helper.response(res, 404, 'Email not Registed')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  logout: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      const result = await authModel.updateData({ user_is_online: 0 }, id)
      return helper.response(res, 200, 'Succes Logout !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  register: async (req, res) => {
    try {
      // console.log(req.body)
      const { userName, userEmail, userPassword } = req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword
      }
      // console.log(setData)

      const checkEmailUser = await authModel.getDataCondition({
        user_email: userEmail
      })

      if (checkEmailUser.length === 0) {
        const result = await authModel.addData(setData)
        delete result.user_password

        const url = `http://localhost:3003/backend3/api/v1/auth/change-data/${result.id}`
        helper.sendMail('Please activate your account', url, userEmail)

        return helper.response(
          res,
          200,
          'Succes register User Please Check your Email to Activate your Account !',
          result
        )
      } else {
        return helper.response(res, 400, 'Email has been registered')
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  changeData: async (req, res) => {
    try {
      let token = req.params.token
      let userId = ''
      let setData = {}
      console.log(token)
      if (/^\d+$/.test(token)) {
        userId = token
        setData = { user_verification: '1' }
      } else {
        jwt.verify(token, 'RAHASIA', (error, result) => {
          if (
            (error && error.name === 'JsonWebTokenError') ||
            (error && error.name === 'TokenExpiredError')
          ) {
            return helper.response(res, 403, error.message)
          } else {
            // console.log('DECODE token', result)
            token = result
          }
        })
        userId = token.userId
        setData = token.setData
      }

      if (userId && setData) {
        console.log('Update', setData)
        const result = await authModel.updateData(setData, userId)
        return helper.response(
          res,
          200,
          'succes update data',
          Object.keys(result)
        )
      } else {
        return helper.response(res, 400, 'Bad Request', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
