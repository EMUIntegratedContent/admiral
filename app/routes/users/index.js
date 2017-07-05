const router = require('express').Router();
const api_users = require('./api')

router.get('/', api_users.getAllUsers)

module.exports = router
