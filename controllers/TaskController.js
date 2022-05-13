const TaskModel = require('../models/Task');
const User = require('../models/User');
const { ResourseNotFoundError } = require('../error');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class Task {
    static async CreateTask(req, res, next) {
        try {
          const { title, description } = req.body
          const worker_id = req.user.id;
          const client_id = req.params.id;
          let image = ''
          if(req.file && !req.fileError){
             image = req.file.filename
          }
          
          const findClient = await User.findOne({ _id: client_id, role: 'client' });
          if (!findClient) {
            throw new ResourseNotFoundError(
              'There is no Valid Client with ID:',
              client_id
            );
          } else {
            const task = await TaskModel.create({
              title: title,
              description: description,
              image: image,
              worker_id: worker_id,
              client_id: client_id,
              done_task: false
            });
            if (!task) {
              throw new ResourseNotFoundError('Task is not Created');
            }
            res.json({ message: 'Your New Task is created' });
          }
        } catch (error) {
          next(error);
        }
    }
    static async UpdateTask(req, res, next) {
        try {
          const id = req.params.id;
          const { title, description, status} = req.body
          let image = ''
          if(req.file && !req.fileError){
             image = req.file.filename
          }
          const findTask = await TaskModel.findOne({ _id: id });
          if (!findTask) {
            throw new ResourseNotFoundError('You dont have Task  with id: ' + id);
          }if(req.user.role == 'client'){
            if(req.user.id != findTask.client_id){
              res.json({message: 'Forbidden You are not connected with this task As a client'})
            } else {
          
              const task = await TaskModel.updateOne(
                { _id: id },
                { title: title, description: description, image: image, done_task: status }
              );
              if (!task) {
                throw new ResourseNotFoundError('Your Task is not Updated');
              } else {
                res.json({ message: 'Your Task is updated' });
              }
            }
          } 
        } catch (error) {
          next(error)
        }

    }
    static async DeleteTask(req, res, next) {
      const id = req.params.id;
      try {
        const task = await TaskModel.findOneAndRemove({ _id: id });
        if (!task) {
          throw new ResourseNotFoundError('There is no Task with id: ', id);
        }
        res.json({ message: 'Task is deleted with id: ' + id });
      } catch (error) {
        next(error);
      }
    }
    static async GetAllTasks(req, res, next) {
        try {
          const user_id = req.user.id
          const user_role = req.user.role
          if (user_role == 'client') {
            const findTask = await TaskModel.find({ client_id: user_id });
            if (!findTask) {
              throw new ResourseNotFoundError('There is no Task with Client Name: '+ user.name, user_id);
            } else {
              res.json({ findTask });
            }
          } else {
            const findTask = await TaskModel.find({ });
            if (!findTask.id) {
              throw new ResourseNotFoundError('There is no Task with ID: ', user_id);
            } else {
              res.json({ findTask });
            }
          }
        } catch (error) {
          next(error);
        }
    }
}

module.exports = Task;
