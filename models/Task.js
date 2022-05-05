const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const connection = require('../database/connection')


const task = new mongoose.Schema( {
    title:{
      type: String,
      allowNull: false,
    },
    description: {
      type: String,
      allowNull: false
    },
    worker_id:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
    client_id:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
      message:[
          {
              text:{
                  type:String,
                  required:true
              },
              sender_id:{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'User',
                  required:true
              },
              sender_name:{
                type: String,
                required:true
            }
          }
      ],
    finish_date: {
        type: Date,
      }     
  },
  {
    timestamps: true
  }
  )



const Task= connection.model('Task', task);

module.exports = Task