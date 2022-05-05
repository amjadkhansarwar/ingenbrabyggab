const { Router } = require('express')
const router = new Router()
const WorkerController= require('../controllers/WorkerController')
const TaskController = require('../controllers/TaskController')
const auth = require('../middlewares/auth')
const validation = require('../validator/user')


router.get('/loginworker', validation.loginValidate, WorkerController.loginWorker)
router.patch('/updateworker/:id', auth.workerAuth, WorkerController.UpdateWorker)

router.post('/tasks', validation.taskValidate, auth.workerAuth, TaskController.CreateTask)
router.patch('/tasks/updatetask/:id', validation.taskValidate, auth.workerAuth, TaskController.UpdateTask)
router.patch('/tasks/done/:id', auth.workerAuth, TaskController.DoneTask)



module.exports= router