const express = require("express")
const app = express()

// const http = require('http')
// const {server}= require('socket.io')
// const server = http.createServer(app)
// const io = new Server(server)
const routes = require('./routes')
require('dotenv').config()

app.use( express.json() )
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/api/admin', routes.admin)
app.use('/api/worker', routes.worker)
app.use('/api/client', routes.client)

const PORT = process.env.PORT
app.listen(PORT, 
  () => console.log("Running on port " + PORT)
)
