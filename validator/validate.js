class Validate {

static  loginValidate (req, res ,next)
   {
        if(!req.body.email){
            res.status(400).json({
                error: 'Email is require'
            })
        }else if(! req.body.password){
            res.status(400).json({
                error: 'Password is require'
            })
        }
        else{
            next()
        }
    }
static  userValidate (req, res ,next)
   {
        if(!req.body.email){
            res.status(400).json({
                error: 'Email is require'
            })
        }else if(! req.body.password){
            res.status(400).json({
                error: 'Password is require'
            })
        }else if(! req.body.name){
            res.status(400).json({
                error: 'Name is require'
            })
        }else if(!req.body.role){
            res.status(400).json({
                error: 'Role is require. Choose worker or client.'
            })
        }
        else{
            next()
        }
    }
static  TaskValidate (req, res ,next)
   {
        if(!req.body.title){
            res.status(400).json({
                error: 'Title is require'
            })
        }else if(! req.body.description){
            res.status(400).json({
                error: 'Description is require'
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
                 error: 'Title is require'
             })
         }else if(!req.body.text){
            res.status(400).json({
                error: 'Text is require'
            })
        }
         else{
             next()
         }
     }
static  imageValidate (req, res ,next)
    {
          if(!req.file){
            res.status(400).json({
                error: 'Image File is require'
            })
         }
         else{
             next()
         }
    }
    
}
module.exports= Validate