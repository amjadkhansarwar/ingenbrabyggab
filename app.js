const express = require('express');
const app = express();
const routes = require('./routes');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/user', routes.user);
app.use('/api/tasks', routes.task);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Running on port ' + PORT));
