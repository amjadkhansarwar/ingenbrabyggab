const jwt = require('jsonwebtoken')
require('dotenv').config()

class AdminAuth{
    static adminAuth (req, res, next){
        if(!req.headers.authorization){
            return res.json({message: 'Your token is missing'})
        }
        try {
            const token = req.headers.authorization.replace("Bearer ","")
            const  user = jwt.verify(token, process.env.SECRET_KEY_ADMIN)
            console.log(user)
            req.user ={
                email:user.email,
                name: user.name
            } 
            console.log(req.user)
        } catch (error) {
            if(error instanceof jwt.TokenExpiredError){
                return res.json({message: 'your token is Expire'})
            }
        }
        next()
    }
    // static workerAuth (req, res, next){
    //     if(!req.headers.authorization){
    //         return res.json({message: 'Your token is missing'})
    //     }
    //     try {
    //         const token = req.headers.authorization.replace("Bearer ","")
    //         const  user = jwt.verify(token, process.env.SECRET_KEY_WORKER)
    //         console.log(user)
    //         req.user ={
    //             email:user.email,
    //             name: user.name
    //         } 
    //         console.log(req.user)
    //     } catch (error) {
    //         if(error instanceof jwt.TokenExpiredError){
    //             return res.json({message: 'your token is Expire'})
    //         }
    //     }
    //     next()
    // }
    // static clientAuth (req, res, next){
    //     if(!req.headers.authorization){
    //         return res.json({message: 'Your token is missing'})
    //     }
    //     try {
    //         const token = req.headers.authorization.replace("Bearer ","")
    //         const  user = jwt.verify(token, process.env.SECRET_KEY_CLIENT)
    //         console.log(user)
    //         req.user ={
    //             email:user.email,
    //             name: user.name
    //         } 
    //         console.log(req.user)
    //     } catch (error) {
    //         if(error instanceof jwt.TokenExpiredError){
    //             return res.json({message: 'your token is Expire'})
    //         }
    //     }
    //     next()
    // }

}

module.exports = AdminAuth