const express=require("express");
const route=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../Models/User");

//-------------------------SIGNuP--------------------------------
route.post('/signUp',(req,res,next)=>{
    // console.log('function from sign up')
bcrypt.hash(req.body.password,10).then(hash=>{
    const user=new User({
        email:req.body.email,
        password:hash,
        name:req.body.name
    });
    user.save().then(result=>{
        res.status(201).json({message:"user added succesfuly",result:result})
    }).catch(error=>{res.status(400).json({message:"oups we can't add user somthing went wrong!"})})
})
})
//---------------------------Login---------------------------------
route.post("/login",(req,res,next)=>{
let fetchedUser;
User.findOne({email:req.body.email}).then(user=>{
    console.log(user);
    console.log('hello from login ')
    fetchedUser=user;
    if (!user){
        res.status(404).json({message:"user not found"});
    }
    return bcrypt.compare(req.body.password,fetchedUser.password)
}).then(result=>{
    if(!result){
        res.status(404).json({message:"faild to connect!"})
    }
    const token=jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},
                          "secret_this_should_be_longer",
                             {expiresIn: "1h"}
        );
    console.log(token)
    res.status(201).json({message:"connected !",token:token});
}).catch(error=>{
    console.log(error);
    res.status(400).json({message:"somthing went wrong!"})
})
})
module.exports=route;
