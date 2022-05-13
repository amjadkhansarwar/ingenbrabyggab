const jwt = require('jsonwebtoken');
require('dotenv').config();

class Auth {
  static adminAuth(req, res, next) {

    try {
      if (!req.headers.authorization) {
        return res.json({ message: 'Your token is missing' })
      }else{
      const token = req.headers.authorization.replace('Bearer ', '')
      const user = jwt.verify(token, process.env.SECRET_KEY)
      if(user.role !== 'admin')
      {
        res.status(401).json({ error: 'Forbidden' }); 
      }
      else{
        req.user= {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
        next()
      }
    }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.json({ message: 'your token is Expire' });
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
    }
  }
  static workerAuth(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.json({ message: 'Your token is missing' })
      }else{
      const token = req.headers.authorization.replace('Bearer ', '')
      const user = jwt.verify(token, process.env.SECRET_KEY)
      if(user.role !== 'worker')
      {
        res.status(401).json({ error: 'Forbidden' }); 
      }
      else{
        req.user= {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
        next()
      }
    }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.json({ message: 'your token is Expire' });
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
    }
  }
  static clientAuth(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.json({ message: 'Your token is missing' })
      }else{
      const token = req.headers.authorization.replace('Bearer ', '')
      const user = jwt.verify(token, process.env.SECRET_KEY)
      if(user.role !== 'client')
      {
        res.status(401).json({ error: 'Forbidden' }); 
      }
      else{
        req.user= {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
        next()
      }
    }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.json({ message: 'your token is Expire' });
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
    }
  }
static userAuth(req, res, next){
    try {
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
      next()
    }
    } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
       return res.json({ message: 'your token is Expire' });
    } else {
       res.status(401).json({ error: 'Invalid token' });
    }
    } 
}
static taskAuth(req, res, next){
  try {
  if (!req.headers.authorization) {
    return res.json({ message: 'Your token is missing' })
  }else{
    const token = req.headers.authorization.replace('Bearer ', '')
    const user = jwt.verify(token, process.env.SECRET_KEY)
    if(user.role == 'client')
    {
      res.json({message: 'Forbidden You are client can not Access this endpoint'})
    }else{
    req.user= {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
    }
    next()
  }
  }
  } catch (error) {
  if (error instanceof jwt.TokenExpiredError) {
     return res.json({ message: 'your token is Expire' });
  } else {
     res.status(401).json({ error: 'Invalid token' });
  }
  } 
}

}

module.exports = Auth;
