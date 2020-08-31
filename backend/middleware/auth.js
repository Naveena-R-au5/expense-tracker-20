const mongoose = require('mongoose')
const User = mongoose.model('user')
const JWT = require('jsonwebtoken')
const {SECRET_KEY} = require('../../config/key')

module.exports = (req,res,next) =>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({err:"you must login to view the page"})   
    }
    const token = authorization.replace("Bearer","")
    // console.log("Token",token)
    JWT.verify(token,SECRET_KEY,(err,payload)=>{
        if(err){
            return res.status(401).json({err:"you must login first"})   
        }
        const {_id,name,email,phone} = payload

        User.findById(_id,name,email,phone).then(userData=>{
          req.user = userData
        //   console.log("user details",userData)
          next()
        })
    })
}