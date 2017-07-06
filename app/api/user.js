const router = require('express').Router();

const User           = require('../models/User')
const userController = require('../controllers/api/apiUserController')
const acl = require('../../authorization').getAcl()
const utils = require('../utils/utilities')

//router.get('/all', acl.middleware(1, utils.getUserId, 'get'), async (req, res) =>{
router.get('/all', async (req, res) =>{
  try{
    const users = await userController.getAllUsers()
    return res.status(200).json(users)
  } catch(error) {
    return res.status(400).json(error)
  }
})

module.exports = router
