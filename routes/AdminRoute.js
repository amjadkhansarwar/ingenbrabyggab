const { Router } = require('express')
const router = new Router()
const adminController= require('../controllers/AdminController')
const TaskController = require('../controllers/TaskController')
const auth = require('../middlewares/auth')
const useerValidation = require('../validator/user')

//----------Admin----------------//

router.get('/loginadmin', useerValidation.loginValidate, adminController.loginAdmin)

//------------worker----------------------//

router.post('/createworker',  useerValidation.createValidate, auth.adminAuth, adminController.CreateWorker)

router.delete('/deleteworker/:id', auth.adminAuth, adminController.DeleteWorker)

//router.patch('/updateworker/:id', auth.adminAuth, adminController.UpdateWorker)
//router.get('/getallworker', auth.adminAuth, adminController.GetAllWorker)
//router.get('/getoneworker/:id', auth.adminAuth, adminController.GetOneWorker)

//------------Client----------------------//

router.post('/createclient',  useerValidation.createValidate, auth.adminAuth, adminController.CreateClient)

router.delete('/deleteclient/:id', auth.adminAuth, adminController.DeleteClient)

router.delete('/deletetask/:id', auth.adminAuth, TaskController.DeleteTask)



module.exports= router