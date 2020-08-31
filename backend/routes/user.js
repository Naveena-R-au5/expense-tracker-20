const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const {SECRET_KEY} = require('../../config/key')
const Auth = require('../middleware/auth')
const User = mongoose.model('user')
const router = express.Router()

router.post('/register',(req,res)=>{
    const {name,email,password,phone} = req.body
    if(!name || !email|| !password ||!phone){
        return res.status(422).json({error:"please fill all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({errMessage:"User email already exist"})
        }
        bcrypt.hash(password,12)
        .then(hashPassword =>{
            const user = new User({
                name,
                email,
                password:hashPassword,
                phone
            })
            user.save().then(user=>{
                res.json({message:`Hello ${user.name},you have registered successfully!`})
            })
        }).catch(err=>{
            console.log("registered error",err)
    })
  })
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({errors:"please fill email & password fields"}) 
    }
    User.findOne({email:email}).then(savedUser =>{
        if(!savedUser){
            return res.status(422).json({errorm:"invalid user details,please register"})
        }
    bcrypt.compare(password,savedUser.password)
    .then(ifMatch=>{
        if(ifMatch){
            const token = JWT.sign({_id:savedUser._id},SECRET_KEY)
            const {_id,name,email,phone} = savedUser
            res.json({token,user:{_id,name,email,phone}})
        }
        else{
            return res.status(422).json({err:"invalid user details"})
        }
    }).catch(err=>{
        console.log("login error",err)
    })
  })
}) 


module.exports = router;