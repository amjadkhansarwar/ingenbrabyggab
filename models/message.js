const mongoose = require('mongoose');
const connection = require('../database/connection');

const message = new mongoose.Schema({
  title: {
    type: String,
    allowNull: false,
  },
  task_id: {
    type: String,
    allowNull: false
  },
  message: [
    {
      text: {
        type: String,
        required: true,
      },
      sender_id: {
        type: String
      },
      sender_name: {
        type: String,
        required: true,
      },
      sender_role:{
        type: String,
        required: true
      }
    },
  ],
});

const Message = connection.model('Message', message);

module.exports = Message;
