const admin = require('./AdminRoute');
const worker = require('./WorkerRoute');
const client = require('./ClientRoute');
const user = require('./UserRoute')

module.exports = { admin, worker, client, user};
