const topUpModel = require('../../model/transaction/topup.model')
const response = require('../../helper/response')

module.exports = {
  // Get user profile from db
  topUp: async (req, res) => {
    try {
      const { date, payment, userid, name, price } = req.body
      const dataSuccess = {
        date,
        payment_method_id: payment,
        user_id: userid,
        name,
        price,
        type_id: '2'
      }
      const dataFailed = {
        date,
        payment_method_id: payment,
        user_id: userid,
        name,
        price,
        type_id: '2',
        status: '2'
      }
      const findUser = await topUpModel.findUser({ id: parseInt(userid) })
      if (findUser) {
        await topUpModel.topUp(dataSuccess)
        res.status(200).send(response({
          status: true,
          msg: 'success top up'
        }))
      } else {
        await topUpModel.topUp(dataFailed)
        res.status(400).send(response({
          msg: 'No Found User for top up'
        }))
      }
    } catch (error) {
      res.status(400).send(response({
        msg: 'Something wrong, Try again'
      }))
    }
  }
}
