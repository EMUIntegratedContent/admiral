const router = require('express').Router();
const api_admin = require('./api')

const User           = require('../../models/User')
const userController = require('../../controllers/user')
const acl = require('../../../authorization').getAcl()
const utils = require('../../utils/utilities')

// define the home page route
router.get('/users', acl.middleware(1, utils.getUserId, 'view'), async (req, res) => {
  try {
    const result = await userController.getAllUsers() // Remember: getAllUsers is in the controller.
    res.render("admin/users");
  } catch (error) {
    return res.status(500).json(error);
  }
})

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.get('/', acl.middleware(1, utils.getUserId, 'view'), function (req, res) {
//router.get('/', function (req, res) {
  //console.log(utils.getUserId())
  //acl.removeUserRoles(req.user.id, 'powerpf', function(err){})
  //acl.addUserRoles(req.user.id, 'admin', function(err){})
  res.send("ADMIN HOME")
})

router.post('/user/deactivate', acl.middleware(1, utils.getUserId, 'get'), async (req, res) =>{
  return await api_admin.deactivateUser()
})

module.exports = router
