const { Router } = require('express')
const router = new Router()
const TaskController = require('../controllers/TaskController')
const ImageController = require('../controllers/ImageController')
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

  router.post(
  '/:id/uploadimage',
  auth.userAuth,
  fileUpload.single('imageName'),
  validation.imageValidate,
  ImageController.ImageUpload
  );
  router.get(
  '/:id/allimages',
  auth.userAuth,
  ImageController.GetAllImages
  );
  // router.delete(
  // '/:id/deleteimage',
  // auth.adminAuth,
  // ImageController.DeleteImage
  // );
  // router.patch(
  // '/:id/updateimage',
  // validation.imageValidate,
  // ImageController.UpdateImage
  // );

module.exports= router