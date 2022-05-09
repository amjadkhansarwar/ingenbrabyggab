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
    worker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    finish_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Task = connection.model('Task', task);

module.exports = Task;
