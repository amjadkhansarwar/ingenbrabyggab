const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { ResourseNotFoundError } = require('../error');
const passwordHash = require('../security');
require('dotenv').config();

class Worker {
  static async loginWorker(req, res, next) {
    const { email, password } = req.body;
    try {
      const worker = await User.findOne({ email: email, role: 'worker' });
      if (!worker) {
        throw new ResourseNotFoundError(
          ' You dont have worker Account  with this Email: ' + email + ''
        );
      } else {
        let payload = {
          worker_id: worker.id,
          email: worker.email,
          name: worker.name,
          role: 'worker',
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY_WORKER, {
          expiresIn: '1h',
        });
        res.json({ token });
      }
    } catch (error) {
      next(error);
    }
  }

  static async UpdateWorker(req, res, next) {
    const id = req.params.id;
    const { name, email, password } = req.body;
    try {
      const findworker = await User.findOne({ _id: id, role: 'worker' });
      if (!findworker) {
        throw new ResourseNotFoundError(
          'You dont have Worker account with id: ' + id
        );
      } else {
        const hashPassword = await passwordHash.bcryptPassword(password);
        const worker = await User.updateOne(
          { _id: id },
          { name: name, email: email, password: hashPassword, role: 'worker' }
        );
        if (!worker) {
          throw new ResourseNotFoundError('Your Account is not Updated');
        } else {
          res.json({ message: 'Your Account is updated' });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async GetAllWorker(req, res, next) {
    try {
      const worker = await User.find({ role: 'worker' });
      if (!worker) {
        throw new ResourseNotFoundError(' There is no worker in your database');
      }
      res.json({ worker });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Worker;
