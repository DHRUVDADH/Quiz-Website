const {Schema, default: mongoose} =require('mongoose')
const Question=require('../model/question.model')

const ResultSchema = new Schema({
    quiz_id:{
        type:Schema.Types.ObjectId,
        ref:Question
    },
    earnmarks:{
        type:Number,
        default:0 
    },
    user_answers:[
        {
        type:String,
        enum:["A","B","C","D"]
        }
    ],
    totalmark:{
        type:Number,
        require:true
    }

},{timestamps:true})

module.exports=mongoose.model("Result",ResultSchema)