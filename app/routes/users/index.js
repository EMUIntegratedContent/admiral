const router = require('express').Router();
const userController = require('../../controllers/api/apiUserController')

router.get('/', userController.getAllUsers)

module.exports = router
