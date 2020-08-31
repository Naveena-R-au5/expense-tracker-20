const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const ExpenseSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"user"
    }
},{timestamps:true})

mongoose.model("Expense",ExpenseSchema)