const mongoose = require('mongoose');
const connection = require('../database/connection');

const image = new mongoose.Schema({
  title: {
    type: String,
    allowNull: false,
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  },
  images: [
    {
      picture: {
        type: String,
      },
      sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      sender_name: {
        type: String,
        required: true,
      },
      sender_role: {
        type: String,
        required: true
      }
    },
  ],
});

const Image = connection.model('Image', image);

module.exports = Image;
