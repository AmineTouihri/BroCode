const mongoose = require("mongoose");
const userRoutes=require("./Modules/Routes/User");
const bodyParser=require("body-parser");
const express=require("express");
const app=express();


app.use(bodyParser.json);
//----------------------------setHeaders------------------------------------------------
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin , X-Requested-With , Content-Type , Accept,authorization");//authorization to store the token
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
})

//-----------------------------userRoute----------------
app.use("api/user",userRoutes);

//------------------------
module.exports=app;