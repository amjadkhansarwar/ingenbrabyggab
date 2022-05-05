const TaskModel = require('../models/Task')
const jwt = require('jsonwebtoken')
const {ResourseNotFoundError} = require('../error')
require('dotenv').config()

class Task{
    static async CreateTask(req, res, next){
        const {title,description}= req.body
        const worker_id = req.user.worker_id
        try {
            const task = await TaskModel.create({title:title, description: description, worker_id: worker_id})
            if(!task){
                throw new ResourseNotFoundError('Task is not Created')
              }
            res.json({message: 'Your New Task is created'})
        } catch (error) {
            next(error)
        }
    }
    static async UpdateTask(req, res, next ) {
        const id = req.params.id
        const {title,description} = req.body
        try {
            const findTask =await TaskModel.findOne({_id: id})
          if(!findTask){
            throw new ResourseNotFoundError('You dont have Task account with id: '+ id )
          }else{
            const task =await TaskModel.updateOne({_id: id},{title:title, description: description})
            if(!task){
                throw new ResourseNotFoundError('Your Task is not Updated' )
              }
                else{
                        res.json({message: 'Your Task is updated'})
                }
          }
        } 
        catch (error) {
            next(error)
        }
    }
    static async DoneTask(req, res, next ) {
        const id = req.params.id
        try {
            const findTask =await TaskModel.findOne({_id: id})
          if(!findTask){
            throw new ResourseNotFoundError('You dont have Task account with id: '+ id )
          }else{
            const task =await TaskModel.updateOne({_id: id},{finish_date: Date.now()})
            if(!task){
                throw new ResourseNotFoundError('Your Task is not Done Now' )
              }
                else{
                        res.json({message: 'Your Task is Done Now'})
                }
          }
        } 
        catch (error) {
            next(error)
        }
    }
    static async DeleteTask(req, res, next) {
        const id = req.params.id
        try {
          const task =await TaskModel.findOneAndRemove({_id: id})
          if(!task)
          {
            throw new ResourseNotFoundError('There is no Task with id: ', id)
          }
          res.json({message: 'Task is deleted with id: '+ id })
    
        } catch (error) {
          next(error)
        } 
    }
}

module.exports= Task