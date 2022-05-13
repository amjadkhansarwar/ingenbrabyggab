const { Router } = require('express')
const router = new Router()
const TaskController = require('../controllers/TaskController')
const ImageController = require('../controllers/ImageController')
const messageController = require('../controllers/MessageController')
const auth = require('../middlewares/auth')
const validation = require('../validator/validate')
const fileUpload = require('../middlewares/FileUpload');

  router.post(
  '/createtask/:id',
  auth.taskAuth,
  fileUpload.single('imageName'),
  validation.TaskValidate,
  TaskController.CreateTask
  );

  router.get(
  '/alltasks',
  auth.userAuth,
  TaskController.GetAllTasks
  );

  router.delete(
  '/deletetask/:id',
  auth.adminAuth,
  TaskController.DeleteTask
  );

  router.patch(
  '/updatetask/:id',
  auth.userAuth,
  fileUpload.single('imageName'),
  validation.TaskValidate,
  TaskController.UpdateTask
  );

      /// imasge route /////

 
  router.get(
  '/allimages',
  auth.userAuth,
  ImageController.GetAllImages
  );
  router.get(
  '/:id/image',
  auth.userAuth,
  ImageController.getImageById
  );
  
  // message route //
  
  router.post(
    '/:id/createmessage',
    auth.userAuth,
    validation.messageValidate,
    messageController.CreateMessage
    );
  router.get(
    '/:id/getallmessage',
    auth.userAuth,
    messageController.GetAllMessages
    );
    router.delete(
      '/:id/deletemessage',
      auth.adminAuth,
      messageController.DeleteMessage
      );

module.exports= router