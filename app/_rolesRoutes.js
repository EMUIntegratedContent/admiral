// Administrative routes
const User           = require('./models/User')
const userController = require('./controllers/user')

const acl = require('../authorization').getAcl()

var utils = require('./utils/utilities')

module.exports = function(app, router){

  /**
   * De/activate a user
   */
  //router.get('/activate', acl.middleware(2, utils.getUserId, 'admin'), function (req, res) {
  router.post('/activate', function (req, res) {
    acl.addUserRoles(req.body.userId, 'user', function(err){
      if(err)
        res.status(400).json("Activation status was not updated.")

      return res.status(200).json("User " + req.body.userId + "'s status updated!")
    })
  })

  return router
}
