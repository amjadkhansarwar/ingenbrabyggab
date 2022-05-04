const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Users {
    static async loginUser(req, res) {
        const {email,password} = req.body
        const user =await User.findOne({email: email})
        if(user){
            let payload={
                email:user.email,
                name: user.name
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY,"120ms")
            res.json({token})
        }
        else{
            res.status(403).json({message: 'You dont have account'})
        }
      res.json({user})
    }
    static async CreateUser(req, res) {
        const {name,email,password,role} = req.body
        const user =await User.create({name, email, password, role})
      res.json({user})
    }
    static async UpdateUser(req, res) {
        const id = req.params.id
        const {name,email,password} = req.body
        const user =await User.updateOne({_id: id},{name: name,email:email,password: password})
      res.json({user})
    }
    static async GetOneUser(req, res) {
        const id = req.params.id
        const user =await User.findOne({_id: id})
      res.json({user})
    }
    static async GetAllUsers(req, res) {
        const users = await User.find({})
      res.json({users})
    }
    static async DeleteUser(req, res) {
        const id = req.params.id
        const user =await User.deleteOne({_id: id})
      res.json({user})
    }
}

module.exports = Users
