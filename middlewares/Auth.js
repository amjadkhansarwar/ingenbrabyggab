const jwt = require('jsonwebtoken')
require('dotenv').config()

class Auth{
    static adminAuth (req, res, next){
        if(!req.headers.authorization){
            return res.json({message: 'Your token is missing'})
        }
        try {
            const token = req.headers.authorization.replace("Bearer ","")
            const  user = jwt.verify(token, process.env.SECRET_KEY_ADMIN)
            if(! user.role =='admin')
            {
                throw new error('Forbiden')
            }
           // req.user = user
            next()
            } catch (error) {
            if(error instanceof jwt.TokenExpiredError){
                return res.json({message: 'your token is Expire'})
            }
            else{
                res.status(401).json({error: 'Invalid token'})
              }
        }
        
    }
    static workerAuth (req, res, next){
        if(!req.headers.authorization){
            return res.json({message: 'Your token is missing'})
        }
        try {
            const token = req.headers.authorization.replace("Bearer ","")
            const  user = jwt.verify(token, process.env.SECRET_KEY_WORKER)
            if(! user.role =='worker')
            {
                throw new error('Forbiden')
            }
            req.user = {
                id: user.worker_id,
                name: user.name,
                role: user.role
            }
            next()
        } catch (error) {
            if(error instanceof jwt.TokenExpiredError){
                return res.json({message: 'your token is Expire'})
            }
            else{
                res.status(401).json({error: 'Invalid token'})
              }
        }
    }

    static clientAuth (req, res, next){
        if(!req.headers.authorization){
            return res.json({message: 'Your token is missing'})
        }
        try {
            const token = req.headers.authorization.replace("Bearer ","")
            const  user = jwt.verify(token, process.env.SECRET_KEY_CLIENT)
            if(! user.role =='client')
            {
                throw new error('Forbiden')
            }
            req.user = {
                id: user.client_id,
                name: user.name,
                role: user.role
            }
            next()
        } catch (error) {
            if(error instanceof jwt.TokenExpiredError){
                return res.json({message: 'your token is Expire'})
            }
            else{
                res.status(401).json({error: 'Invalid token'})
              }
        }
        
    }

}

module.exports = Auth