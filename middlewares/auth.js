const jwt = require('jsonwebtoken')
require('dotenv').config()

class Auth{
    static adminAuth (req, res, next){
        if(!req.headers.authorization){
            return res.json({message: 'Unauthorized'})
        }
        try {
            const token = req.headers.authorization.replace("Bearer ","")
            const  user = jwt.verify(token, process.env.SECRET_KEY)
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

}

module.exports = Auth