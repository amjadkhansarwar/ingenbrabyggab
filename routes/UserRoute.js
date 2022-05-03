const { Router } = require('express')
const router = new Router()
const userController= require('../controllers/UserController')

router.post('/createuser', userController.CreateUser)
router.get('/getallusers', userController.GetAllUsers)
router.get('/:id', userController.GetOneUser)
router.delete('/deleteuser', userController.DeleteUser)
router.patch('/:id', userController.UpdateUser)
module.exports= router