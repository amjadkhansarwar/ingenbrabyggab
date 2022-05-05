const TaskModel = require('../models/Task')
const User = require('../models/User')
const {ResourseNotFoundError} = require('../error')
require('dotenv').config()

class Mymessage{

    static async CreateMessage(req, res, next){
        const  user_id = req.user.id
        const user_name = req.user.name
        const {text}  = req.body
        const task_id = req.params.id
        try {
            const findTask = await TaskModel.findOne({_id: task_id})
            if(!findTask){
                throw new ResourseNotFoundError('There is no Task with ID: ', findTask)
            }
            else{
            const myMessage = {$push: {message: [{text:text, sender_id: user_id, sender_name: user_name }]}}
            const createMessage = await TaskModel.updateOne({id: task_id},myMessage)
            if(!createMessage){
                throw new ResourseNotFoundError('Message is not Sent')
            }
            else
            {
                res.json({message: 'Message is sent with User ID '+ user_id})
            }
            }
        } catch (error) {
         next(error)   
        }
    }

}

module.exports= Mymessage