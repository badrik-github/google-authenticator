/**
Project: google-authenticator apis 
version : v0.1
author : @badrik-github , @jimishio
desc : heart of the application.database connection , middleware parsing,request and response formatting occurs here.
*/

//Loading Basic Modules
const mongoose = require('mongoose');
const express = require('express');
var app = express();

//Require MiddleWare
const cors = require('cors');

//port to run application
const PORT = 8000;

//Requiring Routers
const auth = require("./Routers/auth");



//Making Secure Connection Use This Connection String
var connection_string = `mongodb://localhost:27017/google-authenticator`;

//Making Connection
mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {

        console.log("Database connected")
    })
    .catch((err) => {
        console.log(`Error connecting Database: ${err}`)
    })

//Using MiddleWare
//Adding the headers for the requests/response
app.use(express.json());


//CORS options
const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST'
}

//Cors
app.use(cors(corsOptions));


//api calling
app.use("/api", auth);


//Making app live on this port 
app.listen(PORT, async () => {
    console.log(`Yeti apis is running on ${PORT}`);
});
