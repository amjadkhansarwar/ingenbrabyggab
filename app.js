const express = require("express")
const app = express()
const routes = require('./routes')
app.use( express.json() )

app.use(express.urlencoded({extended: true}))
app.use('/api/user', routes.users)

// const mongoose = require('mongoose')
// const connection = require('../database/connection')
// const User = require('./models/User');

*
// app.post('/createuser', async (req, res)=>{
//     const {name,email,password} = req.body
//     await User.create({name, email, password})
//       res.send('user is created')

// })
app.listen(8000)