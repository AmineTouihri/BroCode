const dotenv = require('dotenv');
const express = require('express');
const  Connection  = require('./config/DBConnection.js');
Connection();
dotenv.config()
const app = express();
app.get('/',function (req, res) {
    res.send('Welcome')
});
const PORT = process.env.PORT|| 5000;
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}...`))