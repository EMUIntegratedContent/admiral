const router = require('express').Router();
const userController = require('../../controllers/userController')
const acl = require('../../../authorization').getAcl()
const utils = require('../../utils/utilities')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
// router.get('/', acl.middleware(1, utils.getUserId, 'view'), function (req, res) {
router.get('/', function (req, res) {
  //console.log(utils.getUserId())
  //acl.removeUserRoles(req.user.id, 'powerpf', function(err){})
  //acl.addUserRoles(req.user.id, 'admin', function(err){})
  res.send("ADMIN HOME")
})

// router.get('/users', acl.middleware(1, utils.getUserId, 'view'), (req, res) => {
router.get('/users', (req, res) => {
  res.render("admin/users");
})

router.get('/user/:username/edit', acl.middleware(1, utils.getUserId, 'edit'), async (req, res) => {
  try{
    const user = await userController.getUserByName(req.params.username)
    res.render("admin/users/edit", { user: user});
  } catch(error) {
    res.status(404).render('404')
  }

})

router.post('/user/deactivate', acl.middleware(1, utils.getUserId, 'get'), async (req, res) =>{
  return await userController.deactivateUser()
})

module.exports = router
