const { Router } = require('express')
const router = new Router()
const WorkerController= require('../controllers/WorkerController')
const TaskController = require('../controllers/TaskController')
const MessageController = require('../controllers/MessageController')
const auth = require('../middlewares/auth')
const validation = require('../validator/user')


router.get('/loginworker', validation.loginValidate, WorkerController.loginWorker)
router.patch('/updateworker/:id', auth.workerAuth, WorkerController.UpdateWorker)
router.get('/getallworker', auth.workerAuth, WorkerController.GetAllWorker)

router.post('/tasks/:id', validation.taskValidate, auth.workerAuth, TaskController.CreateTask)
router.patch('/tasks/updatetask/:id', validation.taskValidate, auth.workerAuth, TaskController.UpdateTask)
router.patch('/tasks/done/:id', auth.workerAuth, TaskController.DoneTask)
router.patch('/tasks/:id/messsages', validation.messageValidate, auth.workerAuth, MessageController.CreateMessage)
router.get('/tasks/alltasks', auth.workerAuth, MessageController.GetAllTasks)




module.exports= router