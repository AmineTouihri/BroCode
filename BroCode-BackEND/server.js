const dotenv = require('dotenv');
const express = require('express');
dotenv.config()
const app = express();
app.get('/',function (req, res) {
    res.send('Welcome')
});
const PORT = process.env.PORT|| 5000;
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}...`))