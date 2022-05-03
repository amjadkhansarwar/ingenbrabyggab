const { Router } = require('express')
const router = new Router()
const userController= require('../controllers/UserController')
const auth = require('../middlewares/auth')

router.post('/createuser', userController.CreateUser)
router.get('/getallusers', auth.adminAuth, userController.GetAllUsers)
router.get('/loginuser', userController.loginUser)
router.get('/:id', userController.GetOneUser)
router.delete('/:id', userController.DeleteUser)
router.patch('/:id', userController.UpdateUser)
module.exports= router