// Administrative routes
const User           = require('./models/User')
const userController = require('./controllers/user')

const acl = require('../authorization').getAcl()

var utils = require('./utils/utilities')

module.exports = function(app, router){

  // middleware that is specific to this router
  router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

  // define the home page route
  router.get('/users', acl.middleware(1, utils.getUserId, 'view'), async (req, res) => {
    try {
      const result = await userController.getAllUsers() // Remember: getAllUsers is in the controller.
      res.render("admin/users");
    } catch (error) {
      return res.status(500).json(error);
    }
  })

  // define the home page route
  router.get('/', acl.middleware(1, utils.getUserId, 'view'), function (req, res) {
  //router.get('/', function (req, res) {
    //console.log(utils.getUserId())
    //acl.removeUserRoles(req.user.id, 'powerpf', function(err){})
    //acl.addUserRoles(req.user.id, 'admin', function(err){})
    res.send("ADMIN HOME")
  })

  return router
}
