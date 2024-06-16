const {Schema, default: mongoose}=require('mongoose')
const bcrypt=require('bcrypt')
const Question = require('./question.model')
const Result = require('./result.model')

require('dotenv').config()
const userSchema=new Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    accesstoken:{
        type:String,
    },
    email:{
        type:String,
        require:true
    },
    usertype:{
        type:String,
        enum:["student","faculty","hod"],
        require:true
    },
    quizhistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Question
    }],
    resulthistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Result 
    }],
    student_id:{
        type:String,
        require:true
    }
},{timestamps:true})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

module.exports=mongoose.model("User",userSchema)