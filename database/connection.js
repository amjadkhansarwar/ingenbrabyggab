const mongoose = require('mongoose')

const connection = mongoose.createConnection('mongodb://localhost:27017/ingebrabyggab', {useNewUrlParser: true})
module.exports = connection