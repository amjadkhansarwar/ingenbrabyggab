const mongoose = require('mongoose')
const connection = require('../database/connection')
const bcrypt = require('bcryptjs')


const user = new mongoose.Schema( {
    email:{
      type: String,
      allowNull: false,
    },
    name: {
      type: String,
      allowNull: false
    },
    password: {
      type: String,
      allowNull: false
    },
   role:{
       type: String,
       enum: ['client', 'admin', 'worker'],
       allowNull :false
   }
  })


  user.pre('save', async function(next){
    try {
      
    } catch (error) {
      
    }
  })

const User= connection.model('User', user);
module.exports = User