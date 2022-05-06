const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {ResourseNotFoundError} = require('../error')
const passwordHash= require('../security')
require('dotenv').config()

class Admin {
    static async loginAdmin(req, res, next) {
        const email = req.body.email
        const password = req.body.password
        try {
          const admin =await User.findOne({email: email, role: 'admin'})
          if(!admin){
              throw new ResourseNotFoundError(' You dont have Admin Account  with this Email: '+ email +'')
          }
          else{
            const validPassword = await passwordHash.dcryptPassword(password, admin.password)
            if (!validPassword)  throw new ResourseNotFoundError('Invalid Password.')
              let payload={
                  email:admin.email,
                  name: admin.name,
                  role: 'admin'
              }
              const token = jwt.sign(payload, process.env.SECRET_KEY_ADMIN, { expiresIn: '1h' })
              res.json({token})
          }  
      } catch (error) {
          next(error)
      }
    }

    static async CreateWorker(req, res, next) {
        const {name,email} = req.body

        try {
          const findworker =await User.findOne({email: email, role: 'worker'})
          if(findworker){
            throw new ResourseNotFoundError('Worker account is already Created with this Email: '+ email +'')
          }
          const userPassword= req.body.password
          const password = await passwordHash.bcryptPassword(userPassword)
          const worker =await User.create({name, email, password, role: 'worker'})
          if(!worker){
            throw new ResourseNotFoundError('Worker is not Created')
          }
          res.json({ message: 'worker is created with email av: '+ worker.email+''})
          
        } catch (error) {
          next(error)
        }     
    }

    static async CreateClient(req, res, next) {
      const {name,email} = req.body
      try {
        const findClient =await User.findOne({email: email, role: 'client'})
        if(findClient){
          throw new ResourseNotFoundError('Client account is already Created with this Email: '+ email +'')
        }
        const userPassword= req.body.password
        const password = await passwordHash.bcryptPassword(userPassword)
        const client =await User.create({name, email, password, role: 'client'})
        if(!client){
          throw new ResourseNotFoundError('Client is not Created')
        }
        res.json({ message: 'Client is created with email av: '+ client.email+''})
        
      } catch (error) {
        next(error)
      }     
    }

   static async DeleteWorker(req, res, next) {
    const id = req.params.id
    try {
      const worker =await User.findOneAndRemove({_id: id, role: 'worker'})
      if(!worker)
      {
        throw new ResourseNotFoundError('There is no Client with id: ', id)
      }
      res.json({message: 'Woker is deleted with id: '+ id })

    } catch (error) {
      next(error)
    } 
    }
   static async DeleteClient(req, res, next) {
  const id = req.params.id
  try {
    const client =await User.findOneAndRemove({_id: id, role: 'client'})
    if(!client)
    {
      throw new ResourseNotFoundError('There is no Client with id: ', id)
    }
    res.json({message: 'Client is deleted with id: '+ id})

  } catch (error) {
    next(error)
  } 
    }   
}

module.exports = Admin
