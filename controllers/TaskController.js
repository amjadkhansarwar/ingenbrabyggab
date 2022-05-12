const TaskModel = require('../models/Task');
const User = require('../models/User');
const { ResourseNotFoundError } = require('../error');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class Task {
  static async CreateTask(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.json({ message: 'Your token is missing' })
      }else{
        const token = req.headers.authorization.replace('Bearer ', '')
        const user = jwt.verify(token, process.env.SECRET_KEY)
        if(user.role =='client'){
          res.json({message: 'Forbidden, You are not a Client can not create Task'})
        }else{
        req.user= {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
         }
        }
     }
      try {
        const { title, description } = req.body;
        const worker_id = req.user.id;
        const client_id = req.params.id;
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
      
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.json({ message: 'your token is Expire' });
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
    }
  }
  static async UpdateTask(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.json({ message: 'Your token is missing' })
      }else{
        const token = req.headers.authorization.replace('Bearer ', '')
        const user = jwt.verify(token, process.env.SECRET_KEY)
        if(user.role =='client'){
          res.json({message: 'Forbidden, You are not a Client can not create Task'})
        }else{
        req.user= {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
         }
        }
     }
      try {
        const id = req.params.id;
        const { title, description, status} = req.body;
        const findTask = await TaskModel.findOne({ _id: id });
        if (!findTask) {
          throw new ResourseNotFoundError('You dont have Task  with id: ' + id);
        } else {
          const task = await TaskModel.updateOne(
            { _id: id },
            { title: title, description: description, done_task: status }
          );
          if (!task) {
            throw new ResourseNotFoundError('Your Task is not Updated');
          } else {
            res.json({ message: 'Your Task is updated' });
          }
        }
      } catch (error) {
        next(error);
      }
      
    } catch (error) {
      
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
    try{
        if (!req.headers.authorization) {
        return res.json({ message: 'Your token is missing' })
        }else{
        const token = req.headers.authorization.replace('Bearer ', '')
        const user = jwt.verify(token, process.env.SECRET_KEY)
        req.user= {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
        }
        }
      try {
        const user_id = req.user.id
        const user_role = req.user.role
        if (user_role == 'client') {
          const findTask = await TaskModel.find({ client_id: user_id });
          if (!findTask.id) {
            throw new ResourseNotFoundError('There is no Task with ID: ', user_id);
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
    }catch(error){
      if (error instanceof jwt.TokenExpiredError) {
          return res.json({ message: 'your token is Expire' });
        } else {
          res.status(401).json({ error: 'Invalid token' });
        }
      }
 }
}

module.exports = Task;
