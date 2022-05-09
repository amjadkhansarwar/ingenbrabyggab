const { Router } = require('express');
const router = new Router();
const clientController = require('../controllers/ClientController');
const auth = require('../middlewares/auth');
const validation = require('../validator/validate');
const MessageController = require('../controllers/MessageController');
const ImageController = require('../controllers/ImageController');
const TaskController = require('../controllers/TaskController');
const fileUpload = require('../middlewares/FileUpload');

router.get(
  '/loginclient',
  validation.loginValidate,
  clientController.loginClient
);
router.patch(
  '/updateclient/:id',
  auth.clientAuth,
  clientController.UpdateClient
);

router.get('/tasks/alltasks', auth.clientAuth, TaskController.GetAllTasks);

router.post(
  '/tasks/:id/messsages',
  validation.messageValidate,
  auth.clientAuth,
  MessageController.CreateMessage
);
router.post(
  '/tasks/:id/image',
  auth.clientAuth,
  fileUpload.single('imageName'),
  validation.imageValidate,
  ImageController.ImageUpload
);

module.exports = router;
