const { body } = require('express-validator');
class Validate {

static  loginValidate (req, res ,next)
   {
        if(!req.body.email){
            res.status(400).json({
                error: 'Email is requaire'
            })
        }else if(! req.body.password){
            res.status(400).json({
                error: 'Password is Requaired'
            })
        }
        else{
            next()
        }
    }
static  createValidate (req, res ,next)
   {
        if(!req.body.email){
            res.status(400).json({
                error: 'Email is requaire'
            })
        }else if(! req.body.password){
            res.status(400).json({
                error: 'Password is Requaired'
            })
        }else if(! req.body.name){
            res.status(400).json({
                error: 'Name is Requaired'
            })
        }
        else{
            next()
        }
    }
    static  taskValidate (req, res ,next)
   {
        if(!req.body.title){
            res.status(400).json({
                error: 'Title is requaire'
            })
        }else if(! req.body.description){
            res.status(400).json({
                error: 'Description is Requaired'
            })
        }
        else{
            next()
        }
    }

    static  messageValidate (req, res ,next)
    {
         if(!req.body.title){
             res.status(400).json({
                 error: 'Text is requaire'
             })
         }
         else{
             next()
         }
     }
    

    // static deleteValidate (req, res, next){
    //     const id = req.params.id
    //     if(!req.params.id.isLength({ min: 24 })){
    //         res.status(400).json({
    //             error: 'You need to give right value of id'
    //         })
    //     }
    //     else{
    //         next()
    //     }
        
    //  }
}
module.exports= Validate