const { Router } = require('express')
const router = new Router()
const userController= require('../controllers/UserController')

router.post('/createuser', userController.CreateUser)

module.exports= router