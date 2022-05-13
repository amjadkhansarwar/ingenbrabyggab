const mongoose = require('mongoose');
const connection = require('../database/connection');

const task = new mongoose.Schema(
  {
    title: {
      type: String,
      allowNull: false,
    },
    description: {
      type: String,
      allowNull: false,
    },
    image:{
      type:String
    },
    worker_id: {
      type: String,
      allowNull: false
    },
    client_id: {
      type: String,
      allowNull:false
    },
    done_task: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Task = connection.model('Task', task);

module.exports = Task;
