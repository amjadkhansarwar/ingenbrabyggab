const { Router } = require('express')
const router = new Router()
const clientController= require('../controllers/ClientController')
const auth = require('../middlewares/auth')
const validation = require('../validator/user')
const MessageController = require('../controllers/MessageController')


router.get('/loginclient', validation.loginValidate, clientController.loginClient)
router.patch('/updateclient/:id', auth.clientAuth, clientController.UpdateClient)
router.patch('/tasks/:id/messsages', validation.messageValidate, auth.clientAuth, MessageController.CreateMessage)
router.get('/tasks/alltasks', auth.clientAuth, MessageController.GetAllTasks)



module.exports= router