// Administrative routes
const User           = require('./models/User')
const userController = require('./controllers/user')

const acl = require('../authorization').getAcl()

var utils = require('./utils/utilities')

module.exports = function(app, router){

  router.get('/users/all', acl.middleware(1, utils.getUserId, 'get'), async (req, res) =>{
    try {
      const usersPromise = await userController.getAllUsers()
      return res.status(200).json(usersPromise)
    } catch (error) {
      return res.status(500).json(error)
    }
  })

  router.get('/user/hasRole', acl.middleware(1, utils.getUserId, 'get'), async (req, res) =>{
    return res.status(200).json(true)
  })

  router.post('/user/deactivate', acl.middleware(1, utils.getUserId, 'get'), async (req, res) =>{
    try {
      const result = await userController.deactivateUser(req.body.userId)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json(error)
    }
  })

  return router
}
