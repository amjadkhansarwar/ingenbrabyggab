const { Router } = require('express');
const router = new Router();
const auth = require('../middlewares/auth');
const validation = require('../validator/validate');
const UserController = require('../controllers/UserController')


router.get(
'/userlogin',
validation.loginValidate,
  UserController.logInUser
);
router.post(
  '/createuser',
  validation.userValidate,
  auth.adminAuth,
  UserController.createUser
  );
router.get(
    '/allusers',
    auth.userAuth,
    UserController.getAllUser
    );
router.delete(
    '/deleteuser/:id',
    auth.adminAuth,
    UserController.deleteUser
    );
router.patch(
      '/updateuser',
      validation.userValidate,
      auth.userAuth,
      UserController.updateUser
      );
module.exports= router