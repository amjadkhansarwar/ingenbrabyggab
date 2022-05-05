const { Router } = require('express')
const router = new Router()
const clientController= require('../controllers/ClientController')
const auth = require('../middlewares/auth')
const useerValidation = require('../validator/user')


router.get('/loginclient', useerValidation.loginValidate, clientController.loginClient)
router.patch('/updateclient/:id', auth.clientAuth, clientController.UpdateClient)




module.exports= router