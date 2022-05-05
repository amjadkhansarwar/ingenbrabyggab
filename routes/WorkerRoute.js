const { Router } = require('express')
const router = new Router()
const WorkerController= require('../controllers/WorkerController')
const auth = require('../middlewares/auth')
const useerValidation = require('../validator/user')


router.get('/loginworker', useerValidation.loginValidate, WorkerController.loginWorker)
router.patch('/updateworker/:id', auth.workerAuth, WorkerController.UpdateWorker)




module.exports= router