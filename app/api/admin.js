const router = require('express').Router();

const User           = require('../models/User')
const adminController = require('../controllers/api/apiAdminController')
const acl = require('../../authorization').getAcl()
const utils = require('../utils/utilities')

/* Determine if the user has a given role */
router.post('/hasRole', acl.middleware(1, utils.getUserId, 'get'), async (req, res) =>{
//router.post('/hasRole', async (req, res) =>{
  try{
    const hasRole = await adminController.loggedUserHasRole(req.user.id, req.body.role)
    return res.status(200).json(hasRole)
  } catch(error) {
    return res.status(400).json(error)
  }
})

module.exports = router
