const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {ResourseNotFoundError} = require('../error')
require('dotenv').config()

class Worker {

    static async loginWorker(req, res, next){
        const {email,password} = req.body
        try {
            const worker =await User.findOne({email: email, password: password, role: 'worker'})
            if(!worker){
                throw new ResourseNotFoundError(' You dont have worker Account  with this Email: '+ email +'')
            }
            else{
                let payload={
                    worker_id: worker.id,
                    email:worker.email,
                    name: worker.name,
                    role: 'worker'
                }
                const token = jwt.sign(payload, process.env.SECRET_KEY_WORKER, { expiresIn: '600s' })
                res.json({token})
            }  
        } catch (error) {
            next(error)
        }
    }

     static async UpdateWorker(req, res, next ) {
        const id = req.params.id
        const {name,email,password} = req.body
        try {
            const findworker =await User.findOne({_id: id, role: 'worker'})
          if(!findworker){
            throw new ResourseNotFoundError('You dont have Worker account with id: '+ id )
          }else{
            const worker =await User.updateOne({_id: id},{name: name,email:email,password: password, role: 'worker'})
            if(!worker){
                throw new ResourseNotFoundError('Your Account is not Updated' )
              }
                else{
                        res.json({message: 'Your Account is updated'})
                }
          }
        } 
        catch (error) {
            next(error)
        }
    }
}

module.exports = Worker

//     static async CreateWorker(req, res, next) {
//         const {name,email,password} = req.body
//         try {
//           const findworker =await User.findOne({email: email, role: 'worker'})
//           if(findworker){
//             throw new ResourseNotFoundError('Worker account is already Created with this Email: '+ email +'')
//           }
//           const worker =await User.create({name, email, password, role: 'worker'})
//           if(!worker){
//             throw new ResourseNotFoundError('Worker is not Created')
//           }
//           res.json({ message: 'worker is created with email av: '+ worker.email+''})
          
//         } catch (error) {
//           next(error)
//         }     
//     }

//     static async CreateClient(req, res, next) {
//       const {name,email,password} = req.body
//       try {
//         const findClient =await User.findOne({email: email, role: 'client'})
//         if(findClient){
//           throw new ResourseNotFoundError('Client account is already Created with this Email: '+ email +'')
//         }
//         const client =await User.create({name, email, password, role: 'client'})
//         if(!client){
//           throw new ResourseNotFoundError('Client is not Created')
//         }
//         res.json({ message: 'Client is created with email av: '+ client.email+''})
        
//       } catch (error) {
//         next(error)
//       }     
//   }

//   static async DeleteWorker(req, res, next) {
//     const id = req.params.id
//     try {
//       const worker =await User.findOneAndRemove({_id: id, role: 'worker'})
//       if(!worker)
//       {
//         throw new ResourseNotFoundError('There is no Client with id: ', id)
//       }
//       res.json({message: 'Woker is deleted with id: '+ id })

//     } catch (error) {
//       next(error)
//     } 
// }

// static async DeleteClient(req, res, next) {
//   const id = req.params.id
//   try {
//     const client =await User.findOneAndRemove({_id: id, role: 'client'})
//     if(!client)
//     {
//       throw new ResourseNotFoundError('There is no Client with id: ', id)
//     }
//     res.json({message: 'Client is deleted with id: '+ id})

//   } catch (error) {
//     next(error)
//   } 
// }
    
    // static async UpdateWorker(req, res, next ) {
    //     const id = req.params.id
    //     const {name,email,password} = req.body
    //     const user =await User.updateOne({_id: id},{name: name,email:email,password: password})
    //   res.json({user})
    // }
    // static async GetOneWorker(req, res, next) {
    //     const id = req.params.id
    //     const user =await User.findOne({_id: id, role: 'worker'})
    //   res.json({user})
    // }
    // static async GetAllWorker(req, res, next ) {
    //   try {
    //     const worker = await User.find({role: 'worker'})
    //     if(!worker){
    //       throw new ResourseNotFoundError(' There is no worker in your database')
    //     }
    //     res.json({worker})
    //   } catch (error) {
    //     next(error)
    //   }
      
    // }

