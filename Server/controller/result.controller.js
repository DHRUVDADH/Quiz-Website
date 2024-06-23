const User = require('../model/user.model')
const Result =require('../model/result.model')
const Question =require('../model/question.model')
const Quiz = require("../model/quiz.model")
const {ApiError} = require("../utils/ApiError")

const quizsubmit = async (req,res)=>{
    try {
        const user = req.user
        
        if(user.usertype !== "student")
            {
                return res.status(400).json({
                    success:false,
                    message:"not eligibale to submit quiz"
                })
            }
        const logindetail=await User.findById(user._id)
        
        const {earnmarks,user_answers,quiz_id}=req.body
        const quizdetail = await Question.findById(quiz_id)
        
        const student_result = await Result.create({earnmarks,user_answers,quiz_id,totalmark:quizdetail.totalmarks})
        logindetail.resulthistory.push(student_result._id)
        await logindetail.save({validateBeforeSave:false})
        res.status(200).json({
            success:true,
            message:"quiz save successfully"
        })
    } catch (e) {
        console.log("error in quiz submit controller",e)
    }
}

const updateAnswer = async (req,res)=>{
    try {
        const {quizID  ,questionID , ansVal}=req.body;
        if (!quizID || !questionID || ! ansVal) {
            throw new ApiError(409,'Filled Missing')
        }
        
        const update = {
            quizID: quizID,
            studentID: req.user._id,
            $set: {
              [`answer.${questionID}`]: ansVal
            }
          };

        const options = {
            upsert: true,
            new: true, 
            setDefaultsOnInsert: true, 
        };
        
        const Resu = await Result.findOneAndUpdate(
            { quizID: quizID, studentID: req.user._id }, 
            update, 
            options, 
        );

        console.log(Resu)

        return res.json({
            success:true,
            message:"Quiz Found",
            Result:Resu
        })

       
    } catch (e) {
        console.log(e)
        res.json({
            ...e,
            message: e.message
        })
    }
}

const getAnswer = async (req,res)=>{
    try {
        const {quizID }=req.query;
        if (!quizID ) {
            throw new ApiError(409,'Quiz Id Missing')
        }
        
        const update = {
            $setOnInsert: {  
              quizID: quizID,
              studentID: req.user._id,
            }
          };

        const options = {
            upsert: true,
            new: true, 
            setDefaultsOnInsert: true, 
        };
        
        const Resu = await Result.findOneAndUpdate(
            { quizID: quizID, studentID: req.user._id }, 
            update, 
            options, 
        );
        console.log(Resu)

        return res.json({
            success:true,
            message:"Quiz Found",
            answer:Resu.answer || []
        })

    } catch (e) {
        console.log(e)
        res.json({
            ...e,
            message: e.message
        })
    }
}

module.exports={quizsubmit , updateAnswer,getAnswer}