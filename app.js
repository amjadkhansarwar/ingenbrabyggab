const express = require('express');
const app = express();
const routes = require('./routes');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/admin', routes.admin);
app.use('/api/worker', routes.worker);
app.use('/api/client', routes.client);


// app.post('/send' ,(req,res, next)=>{
//     const title = req.body.title
//     const file = req.file.filename
//     const data 
// res.send(data)
// })

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Running on port ' + PORT));
