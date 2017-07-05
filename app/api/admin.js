const router = require('express').Router();

const User           = require('../models/User')
const userController = require('../controllers/user')
const acl = require('../../authorization').getAcl()
const utils = require('../utils/utilities')

router.get('/hasRole', acl.middleware(1, utils.getUserId, 'get'), async (req, res) =>{
  return res.status(200).json(true)
})

module.exports = router