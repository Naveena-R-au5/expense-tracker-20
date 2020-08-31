const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Auth = require('../middleware/auth')
const Expense = mongoose.model('Expense')

router.post('/createExpense',Auth,(req,res)=>{
    const {amount,date,description} = req.body
    if(!amount || !date ||!description){
        return res.status(422).json({error:"please fill all the fields"})
    }
    req.user.password = undefined
    const expense = new Expense({
        amount,
        description,
        date,
        postedBy:req.user

    })
    expense.save().then(result=>{
        res.json({expense:result})
    
    }).catch(err =>{
        console.log(err)
    })
})

router.get("/myposts",Auth,(req,res)=>{
    Expense.find({postedBy:req.user._id})
    .populate("postedBy","_id name email phone")
    .sort('-createdAt')
    .then(mypost=>{
        res.json({mypost})
    }).catch(err=>{
        console.log(err)
    })
})

router.put("/updateExpense/:id",Auth,(req,res)=>{
    
    Expense.findByIdAndUpdate(req.params.id,{$set:{amount:req.body.amount,description:req.body.description,date:req.body.date}},{new:true},
      (err,result)=>{
         if(err){
            console.log(err)
             return res.status(422).json({error:"data cannot update"})
         }
         res.json(result)
        // console.log(result)
    })
})

router.get('/expense/:id',Auth,(req,res)=>{
    Expense.findOne({_id:req.params.id})
       .populate("postedBy","_id name email phone")
       .then(posts=>{
                res.json({posts})
        
       }).catch(err=>{
           console.log(err)
       })
 })

 router.delete("/deleteExpense/:id",Auth,(req,res)=>{
    Expense.findByIdAndDelete({_id:req.params.id})
    .populate("postedBy","_id name email phone")
    .then(post=>{
       if(post.postedBy._id.toString() === req.user._id.toString()){
             Expense.deleteOne({_id:req.params.id})
             .then(result=>{
                 res.json(result)
                //  console.log(result)
             }).catch(err=>{

                 console.log(err)
             })
       }
    })
})

module.exports = router