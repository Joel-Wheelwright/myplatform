const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({path:'./variables.env'}); // variables.env -> process.env.

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', function(error){
    console.log('Database error:',error);
});

require('./Models/Device');

const app = express();

app.use(bodyParser());
app.use(cors());

app.get('/', function(req, res){
    res.send('It works');
});

const routes = require('./Routes/routes');
app.use('/', routes);

app.listen(process.env.PORT, function(){
    console.log('App listening on port', process.env.PORT);
});