const express = require('express')
const route = express.Router()
const Job= require('../Models/job')
const Apply= require('../Models/apply')
const checkauth = require('../../middlewares/check-auth')



route.post('/add',checkauth,(req,res)=>{
    const  comment = new Job({
        level:req.body.level,
        name :req.body.name,
        imagepath :req.body.imagepath,
        iduser : req.userData.userId,
        location:req.body.location,
        type:req.body.type,
        content :req.body.content,
        salary :req.body.salary,
        tech : req.body.tech
    }).save().then(job=>{
        res.status(200).json({cm :comment})
    },err=>{
        console.log(err)
    })
})
route.get("" ,(req ,res)=>{
    Job.find().then(posts=>{
        res.status(201).json(posts)
    },err=>{
        console.log('something went wrong '+ err)
    })
})

route.post('/apply',checkauth,(req,res)=> {
        Job.updateOne({_id:req.body.idpost},{$inc :{applied :1}}).then(res=>{
            console.log('added 1 to job')
        })
    const apply = new Apply({
        idpost:req.body.idpost,
        iduser:req.userData.userId,
        idposter:req.body.iduser
    }).save().then(apply=>{
        console.log('apply added succefuly')
    }, err=>{
        console.log(err)
    })
})
route.post('/sugest',checkauth,(req,res)=> {
    Job.find({tech:{$in: req.body.lang}}).then(jobs=>{
        res.status(200).json(jobs)
    },err=>{
        console.log(err);
    })

    })
module.exports = route