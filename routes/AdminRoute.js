const { Router } = require('express');
const router = new Router();
const adminController = require('../controllers/AdminController');
const TaskController = require('../controllers/TaskController');
const auth = require('../middlewares/auth');
const useerValidation = require('../validator/validate');


router.get(
  '/loginadmin',
  useerValidation.loginValidate,
  adminController.loginAdmin
);
router.post(
  '/createworker',
  useerValidation.createValidate,
  auth.adminAuth,
  adminController.CreateWorker
);

router.delete(
  '/deleteworker/:id',
  auth.adminAuth,
  adminController.DeleteWorker
);

router.post(
  '/createclient',
  useerValidation.createValidate,
  auth.adminAuth,
  adminController.CreateClient
);

router.delete(
  '/deleteclient/:id',
  auth.adminAuth,
  adminController.DeleteClient
);

router.delete('/deletetask/:id', auth.adminAuth, TaskController.DeleteTask);

module.exports = router;
