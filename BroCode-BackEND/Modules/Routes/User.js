require("dotenv").config();

const express=require("express");
const route=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../Models/User");
//verification model
const userVerification=require("../Models/UserVerification")
//email handler
const nodemailer=require("nodemailer")
//unique string
const {v4:uuidv4}=require("uuid");

const path=require("path");



//node mailer stuff
 let transporter=nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
            pass:process.env.AUTH_PASS
    }
});
 transporter.verify((error,sucess)=>{
     if (error)
         console.log("error:"+error)
     else console.log("ready for message"+sucess);
 })

//-------------------------SIGNuP--------------------------------
route.post('/signUp',(req,res,next)=>{
    // console.log('function from sign up')
    bcrypt.hash(req.body.password,10).then(hash=>{
        const user=new User({
            email:req.body.email,
            password:hash,
            name:req.body.name,
            verified:false
        });
        user.save().then(result=>{
            console.log(result)
            sendVerificationEmail({_id:result._id+"",email:result.email},res);
        }).catch(error=>{res.status(400).json({message:"oups we can't add user somthing went wrong!"})})
    })
})

//--------------------------send verification mail method ---------------
const  sendVerificationEmail=({_id,email},res)=> {
    const cuurentUrl = "http://localhost:8000/";
    const uniqueString =  _id;//maybe worng na7i el faza eli 3malha hoia nta3 el uuid deja mat9al9ch blch biha
    const mailOptions = {
        form: process.env.AUTH_EMAIL,
        to: email,
        subject: "verify your email",
        html: `<p>verify your email to complete the signup and login into your account</p>
    <p>this link <b>expire in 6 hours</b></p><p>press<a href=${cuurentUrl + "api/user/verify/" + _id +"/"+ uniqueString}>here</a> to proceed</p>`
    }

    const salRounds = 10;
    bcrypt
        .hash(uniqueString, salRounds)
        .then((hashedString) => {
            const newVerification = new userVerification({
                userId: _id,
                uniqueString: hashedString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 21000000
            })
                console.log(newVerification)
            newVerification
                .save()
                .then(() => {
                        transporter
                            .sendMail(mailOptions)
                            .then(() => {
                                res.json({
                                    status: "pending",
                                    message: "success email verification "
                                })

                            })
                            .catch(error => {
                                console.log(error)
                                res.json({
                                    status: "failed",
                                    message: "something went wrong while transport data "
                                })
                            })})
                            .catch(error => {
                                console.log(error)
                                res.json({
                                    status: "failed",
                                    message: "something went wrong while saving user verification "
                                })
                            })
                    }
                ).catch(error => {
                console.log(error)
                res.json({
                    status: "failed",
                    message: "something went wrong while hashing "
                })
            })
        ;
}

//--------------------------verify email-----------------

route.get("/verify/:userId/:uniqueString",(req,res)=>{
    let {userId,uniqueString}=req.params;

    userVerification.find({userId})
        .then((result)=>{
            if(result.length>0){
                console.log("res1:"+result[0])
                const {expiresAt}=result[0];
                const hashedUniqueString=result[0].uniqueString;
                if (expiresAt<Date.now()){
                    userVerification.deleteOne({userId})
                        .then(resulta=>{
                            User.deleteOne({_id:userId})
                                .then(()=>{
                                    let message= "user deleted please sign up again  ";
                                    res.redirect(`/api/user/verified/error=true&message=${message}`)
                                })
                                .catch(error=>{
                                console.log("error:can't delet user  "+error);
                                    let message= "clearing user with unique string failed ";
                                    res.redirect(`/api/user/verified/error=true&message=${message}`)
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            let message= "An error occured while clearing expired user verification record ";
                            res.redirect(`/api/user/verified/error=true&message=${message}`)
                        })

                }else {
                    bcrypt.compare(uniqueString,hashedUniqueString)
                        .then((result)=>{
                            console.log("res2:"+result)
                            if (result){
                                User.updateOne({_id:userId},{verified:true})
                                    .then(()=>{
                                        console.log("updated3");
                                        res.sendFile(path.join(__dirname,"../views/verified.html"));
                                        console.log("is that her the fucking errror!");
                                    })
                                    .catch(error=>{
                                        let message= "an error occured while updating user to verified";
                                        res.redirect(`/api/user/verified/error=true&message=${message}`)
                                    })
                            }else{
                                let message= "invalid validation of unique string . check your inbox";
                                res.redirect(`/api/user/verified/error=true&message=${message}`)
                            }
                        })
                        .catch(error=>{
                            let message= "an error occured while comparing the unique string";
                            res.redirect(`/api/user/verified/error=true&message=${message}`)
                        })
                }
            }else {
                let message= "account doesn't exist or has been verified already";
                res.redirect(`/api/user/verified/error=true&message=${message}`)
            }
        })
        .catch(error=>{
            console.log(error)
            let message= "An error occured while checking for existing user";
            res.redirect(`/api/user/verified/error=true&message=${message}`)

        });
})


route.get("/verified",(req,res)=>{
    res.sendFile(path.join(__dirname,"./../views/verified.html"))// the file path of the code html that will shown to the user to verify her account using email
})


//-------------------------SIGNuP--------------------------------
/*route.post('/signUp',(req,res,next)=>{
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
})*/
//---------------------------Login---------------------------------
route.post("/login",(req,res,next)=>{
let fetchedUser;
User.findOne({email:req.body.email}).then(user=>{
    console.log(user);
    console.log('hello from login ')
    fetchedUser=user;
    if (!user || !user.verified){
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
    res.status(201).json({message:"connected !",token:token, id : fetchedUser._id  ,name: fetchedUser.name});
}).catch(error=>{
    console.log(error);
    res.status(400).json({message:"somthing went wrong!"})
})
})
module.exports=route;
