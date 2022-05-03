const User = require('../models/User')

class Users {
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
