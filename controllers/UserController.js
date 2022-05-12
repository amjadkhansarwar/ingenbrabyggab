const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { ResourseNotFoundError } = require('../error');
const passwordHash = require('../security');
require('dotenv').config();

class User {
    static async logInUser(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        try {
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                throw new ResourseNotFoundError(
                    'You do not have Account with this Email: ' + email + '')
            } else {
                const validPassword = await passwordHash.dcryptPassword(password, user.password)
                if (!validPassword) {
                    throw  new ResourseNotFoundError('Invalid Password')
                } else {
                        if (user.role == 'admin') {
                            let payload = {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                            }
                            const token = jwt.sign(payload, process.env.SECRET_KEY_ADMIN, { expiresIn: '1h', })
                            res.json({ token, payload })
                        }else if (user.role == 'worker') {
                            let payload = {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                            }
                            const token = jwt.sign(payload, process.env.SECRET_KEY_ADMIN, { expiresIn: '1h', })
                            res.json({ token , payload})
                        }else if(user.role == 'client') {
                            let payload = {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                            }

                            const token = jwt.sign(payload, process.env.SECRET_KEY_ADMIN, { expiresIn: '1h', })
                            res.json({ token, payload })
                        }
                    }
             }
        }catch (error) {
                next(error);
            }

    }

    static async createUser(req, res, next) {
        const { name, email, password, role} = req.body;
        try {
          const findUser = await UserModel.findOne({ email: email});
          if (findUser) {
            throw new ResourseNotFoundError(
              'Account already exists with email: ' + email + ''
            );
          }else {
              console.log(role)
              if(role == 'worker'){
                await UserModel.create({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                  });
                  res.json({
                    message: 'A new ' + role + ' has been created!'
                  });
               
              }else if(role == 'client'){
                await UserModel.create({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                  });
                  res.json({
                    message: 'A new ' + role + ' has been created!'
                  });
              }
              else{
                res.json({error: 'Chose role Only Worker Eller CLient'})
          }
        }
        } catch (error) {
          next(error);
        }
      }
    static async getAllUser(req, res, next) { 
        try {
            const user = await UserModel.find({});
            if (!user) {
                throw new ResourseNotFoundError(' There is no worker in your database');
              }
              res.json({ user });
          } catch (error) {
            next(error);
          }
    }
    static async getAllWorkers(req, res, next) { 
        try {
            const user = await UserModel.find({role: 'worker'});
            if (!user) {
                throw new ResourseNotFoundError(' There is no worker in your database');
              }
              res.json({ user });
          } catch (error) {
            next(error);
          }
    }
    static async getAllClients(req, res, next) { 
        try {
            const user = await UserModel.find({role: 'client'});
            if (!user) {
                throw new ResourseNotFoundError(' There is no worker in your database');
              }
              res.json({ user });
          } catch (error) {
            next(error);
          }
    }
    static async updateUser(req, res, next) {
        try{
        if (!req.headers.authorization) {
            return res.json({ message: 'Your token is missing' })
          }else{
          const token = req.headers.authorization.replace('Bearer ', '')
          const user = jwt.verify(token, process.env.SECRET_KEY_ADMIN)
          req.user= {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
           }
        }
      }catch(error){
        if (error instanceof jwt.TokenExpiredError) {
            return res.json({ message: 'your token is Expire' });
          } else {
            res.status(401).json({ error: 'Invalid token' });
          }
        }
        const id = req.params.id;
        const { name, email, password } = req.body;
        try {
          const findUser = await UserModel.findOne({ _id: id, role: req.user.role });
          if (!findUser) {
            throw new ResourseNotFoundError(
              'You dont have Accessof this account with id: ' + id
            );
          } else {
            const hashPassword = await passwordHash.bcryptPassword(password);
            const user = await UserModel.updateOne(
              { _id: id, role: req.user.role },
              { name: name, email: email, password: hashPassword }
            );
            if (!user) {
              throw new ResourseNotFoundError('Your Account is not Updated');
            } else {
              res.json({ message: 'Your Account is updated' });
            }
          }
        } catch (error) {
          next(error);
        }
    }
    static async deleteUser(req, res, next) {
        const id = req.params.id;
        try {
          const user = await UserModel.findOneAndRemove({ _id: id });
          if (!user) {
            throw new ResourseNotFoundError('There is no Client with id: ', id);
          }
          res.json({ message: 'User is deleted with id: ' + id });
        } catch (error) {
          next(error);
        }
    }
}

module.exports = User