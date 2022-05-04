const { Router } = require('express')
const router = new Router()
const clientController= require('../controllers/ClientController')
const auth = require('../middlewares/auth/ClientAuth')
const useerValidation = require('../validator/user')

//----------Admin----------------//

router.get('/loginclient', useerValidation.loginValidate, clientController.loginClient)
router.patch('/updateclient/:id', auth.clientAuth, clientController.UpdateClient)

//------------worker----------------------//

// router.post('/createworker',  useerValidation.createValidate, auth.adminAuth, adminController.CreateWorker)

// router.delete('/deleteworker/:id', auth.adminAuth, adminController.DeleteWorker)

//router.patch('/updateworker/:id', auth.adminAuth, adminController.UpdateWorker)
//router.get('/getallworker', auth.adminAuth, adminController.GetAllWorker)
//router.get('/getoneworker/:id', auth.adminAuth, adminController.GetOneWorker)

//------------Client----------------------//

// router.post('/createclient',  useerValidation.createValidate, auth.adminAuth, adminController.CreateClient)

// router.delete('/deleteclient/:id', auth.adminAuth, adminController.DeleteClient)



module.exports= router