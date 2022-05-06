const { Router } = require('express')
const router = new Router()
const WorkerController= require('../controllers/WorkerController')
const TaskController = require('../controllers/TaskController')
const MessageController = require('../controllers/MessageController')
const ImageController = require('../controllers/ImageController')
const auth = require('../middlewares/auth')
const fileUpload= require('../middlewares/FileUpload')
const validation = require('../validator/validate')


router.get('/loginworker', validation.loginValidate, WorkerController.loginWorker)
router.patch('/updateworker/:id', auth.workerAuth, WorkerController.UpdateWorker)
router.get('/getallworker', auth.workerAuth, WorkerController.GetAllWorker)

router.post('/tasks/:id', validation.taskValidate, auth.workerAuth, TaskController.CreateTask)
router.patch('/tasks/updatetask/:id', validation.taskValidate, auth.workerAuth, TaskController.UpdateTask)
router.patch('/tasks/done/:id', auth.workerAuth, TaskController.DoneTask)
router.get('/tasks/alltasks', auth.workerAuth, TaskController.GetAllTasks)

router.post('/tasks/:id/messsages', auth.workerAuth, validation.messageValidate, MessageController.CreateMessage)
router.post('/tasks/:id/image',  auth.workerAuth, fileUpload.single('imageName'), ImageController.ImageUpload)




module.exports= router