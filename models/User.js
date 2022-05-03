const mongoose = require('mongoose')
const connection = require('../database/connection')


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
   
  })



const User= connection.model('User', user);
module.exports = User