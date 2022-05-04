const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {ResourseNotFoundError} = require('../error')
require('dotenv').config()

class Client {

    static async loginClient(req, res, next){
        const {email,password} = req.body
        try {
            const worker =await User.findOne({email: email, password: password, role: 'client'})
            if(!worker){
                throw new ResourseNotFoundError(' You dont have Client Account  with this Email: '+ email +'')
            }
            else{
                let payload={
                    email:worker.email,
                    name: worker.name
                }
                const token = jwt.sign(payload, process.env.SECRET_KEY_CLIENT, { expiresIn: '60s' })
                res.json({token})
            }  
        } catch (error) {
            next(error)
        }
    }

     static async UpdateClient(req, res, next ) {
        const id = req.params.id
        const {name,email,password} = req.body
        try {
            const findclient =await User.findOne({_id: id, role: 'client'})
          if(!findclient){
            throw new ResourseNotFoundError('You dont have Worker account with id: '+ id )
          }else{
            const client =await User.updateOne({_id: id},{name: name,email:email,password: password, role: 'client'})
            if(!client){
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

module.exports = Client