const mongoose = require('mongoose');
const connection = require('../database/connection');

const image = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  },
  images: [
    {
      picture: {
        type: String,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      user_name: {
        type: String,
        required: true,
      },
      user_role: {
        type: String,
        required: true
      }
    },
  ],
});

const Image = connection.model('Image', image);

module.exports = Image;
