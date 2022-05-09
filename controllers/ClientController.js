const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {ResourseNotFoundError} = require('../error')
const passwordHash= require('../security')
const Image = require('../models/Image')
require('dotenv').config()

class Client {

    static async loginClient(req, res, next){
        const {email} = req.body
        try {
            const client =await User.findOne({email: email, role: 'client'})
            if(!client){
                throw new ResourseNotFoundError(' You dont have Client Account  with this Email: '+ email +'')
            }
            else{
                const password = req.body.password
                const validPassword = await passwordHash.dcryptPassword(password, client.password)
                 if (!validPassword) {
                      throw new ResourseNotFoundError('Invalid Password.')
                    }
                    else{
                    let payload={
                    id : client.id,
                    email:client.email,
                    name: client.name,
                    role: 'client'
                    }
                    const token = jwt.sign(payload, process.env.SECRET_KEY_CLIENT, { expiresIn: '1h' })
                     res.json({token})
                }
            }  
        } catch (error) {
            next(error)
        }
    }

     static async UpdateClient(req, res, next ) {
        const id = req.params.id
        const {name,email,password} = req.body
        try {            const findclient =await User.findOne({_id: id, role: 'client'})
          if(!findclient){
            throw new ResourseNotFoundError('You dont have Client account with id: '+ id )
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