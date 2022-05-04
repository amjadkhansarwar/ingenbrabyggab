const express = require("express")
const app = express()
const routes = require('./routes')

app.use( express.json() )
app.use(express.urlencoded({extended: true}))
app.use('/api/admin', routes.admin)
app.use('/api/worker', routes.worker)
app.use('/api/client', routes.client)

app.listen(8000)