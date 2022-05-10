const { Router } = require('express');
const router = new Router();
const adminController = require('../controllers/AdminController');
const TaskController = require('../controllers/TaskController');
const auth = require('../middlewares/auth');
const validation = require('../validator/validate');
const UserController = require('../controllers/UserController')


router.get(
'/userlogin',
validation.loginValidate,
  UserController.logInUser
);
router.post(
  '/user',
  validation.createValidate,
  auth.adminAuth,
  UserController.createUser
  );
  router.get(
    '/users',
    auth.adminAuth,
    UserController.getAllUser
    );
  router.get(
      '/allworkers',
      auth.clientAuth,
      UserController.getAllWorkers
      );
  router.get(
        '/allclients',
        auth.workerAuth,
        UserController.getAllClients
        );
  router.delete(
    '/user/:id',
    auth.adminAuth,
    UserController.deleteUser
    );
    router.patch(
      '/user/:id',
      UserController.updateUser
      );
module.exports= router