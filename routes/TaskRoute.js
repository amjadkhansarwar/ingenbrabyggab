const { Router } = require('express')
const router = new Router()
const TaskController = require('../controllers/TaskController')
const ImageController = require('../controllers/ImageController')
const auth = require('../middlewares/auth')
const validation = require('../validator/validate')



router.post(
  '/createtask/:id',
  validation.TaskValidate,
  TaskController.CreateTask
  );
router.get(
    '/alltasks',
    TaskController.GetAllTasks
    );
router.delete(
    '/deletetask/:id',
    auth.adminAuth,
    TaskController.DeleteTask
    );
router.patch(
      '/updatetask/:id',
      validation.TaskValidate,
      TaskController.UpdateTask
      );

      /// imasge route /////

  router.post(
  '/:id/uploadimage',
  validation.imageValidate,
  ImageController.ImageUpload
  );
  router.get(
  '/allimages',
  ImageController.GetAllImages
  );
  router.delete(
  '/:id/deleteimage',
  auth.adminAuth,
  ImageController.DeleteImage
  );
  router.patch(
  '/:id/updateimage',
  validation.imageValidate,
  ImageController.UpdateImage
  );

module.exports= router