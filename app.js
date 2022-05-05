const express = require("express")
const app = express()
const routes = require('./routes')

app.use( express.json() )
app.use(express.urlencoded({extended: true}))
app.use('/api/admin', routes.admin)
app.use('/api/worker', routes.worker)
app.use('/api/client', routes.client)

// const bcrypt = require('bcryptjs')

// function generateHash(password){
//   const hash = bcrypt.hashSync(password)
//   return hash
// }



// const password = "grillkorv123"

// const hash = generateHash(password);



// const result = bcrypt.compareSync("grillkorv123", hash)
// console.log(result);

app.listen(8000)