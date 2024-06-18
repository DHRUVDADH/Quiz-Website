const Quiz =require('../model/quiz.model')
const User =require('../model/user.model')
const Question = require('../model/question.model')
const jwt = require('jsonwebtoken')
const {ApiError} = require('../utils/ApiError')



// const insertquestions = async (req, res) => {
//     try {
//         const user = req.user;
//         if (user.usertype === "student") {
//             return res.status(401).json({
//                 success: false,
//                 message: "not valid for create quiz"
//             })
//         }
//         console.log("quiz token: >", req.cookies.quiztoken)
//         const quiz_id = await quiztokendecode(req.cookies.quiztoken);
//         const quizdetail = await Question.findById(quiz_id._id);
//         console.log("quiz id is->", quizdetail)
//         const { question, A, B, C, D, answer } = req.body;

//         if (!question || !A || !B || !C || !D || !answer) {
//             return res.status(400).json({
//                 success: false,
//                 message: "enter proper detail of mcq"
//             })
//         }
//         const updatemcq = await quizdetail.multiqueston.push({ question, A, B, C, D, answer });
//         console.log("updated mcq is:", updatemcq)
//         console.log("quizdetail: ->", quizdetail)
//         quizdetail.save({ validateBeforeSave: false })
//         return res.status(200).json({
//             success: true,
//             message: "mcq update successfully"
//         })
//     } catch (e) {
//         console.log("error in insertquestions", e)
//     }
// }

// const getquizmcq = async ( req,res ) => {
//     try {
//         const quiz=req.quiz;
//         const getquiz=await Question.findById(quiz?._id)
//         if(!getquiz){
//             return res.status(404).json({
//                 success:false,
//                 message:"sorry no quiz active right now"
//             })
//         }
//         // console.log("getquiz is in controller:",getquiz).

//         // console.log("req is in question controller",req)
//         const loginuser = await User.findById(req.user._id)
//         if(!loginuser)
//             {
//                 console.log("loginuser not available in question controller in getquizmcq error")
//             }
//             let quizhistorys = loginuser.quizhistory;
//             console.log("quiz history",quizhistorys)
//             if(quizhistorys.includes(req.quiz._id))
//                 {
//                     return res.status(200).json({
//                         success:true,
//                         message:"quiz mcq get successfully",
//                         data:getquiz.multiqueston
//                     })
//                 }
//         loginuser.quizhistory.push(req.quiz._id)
//         loginuser.save({validateBeforeSave:false})
//         return res.status(200).json({
//             success:true,
//             message:"quiz mcq get successfully",
//             data:getquiz.multiqueston
//         })
        
//     } catch (e) {
//         console.log("error in getquizdetail controller",e)
//     }
// }

// const quizstart = async ( req,res ) => {
//     try {
//         const user =req.user;
//         if(user.usertype === 'student')
//             {
//                 return res.status(400).json({
//                     success:false,
//                     message:"you are not valid for start quiz"
//                 })
//             }
//         const { quiz_id } = req.body
//         if(!quiz_id) return res.status(404).json({success:false,message:"quiz id not found"})
//         const quiz =await Question.findByIdAndUpdate(quiz_id,{is_running:true})
//             return res.status(200).json({
//                 success:true,
//                 message:"detail updated successfully"
//             })
//     } catch (e) {
//         console.log("error in quiz start controller ",e)
//     }
// }

const createQuiz = async (req,res)=>{
    try {
        const { title , durationInMins , noOfQuestion , totalmarks , description , date , time , subId , subName}=req.body;

        if (!title || !durationInMins || !noOfQuestion || !totalmarks || !description || !date || !time || !subId || !subName) {
            throw new ApiError(409,'All Field required')
            }
        
        const existone = await User.findById({
            _id:req.user._id
        }) 
        
        if(!existone){
            throw new ApiError(409,'this user is not Exist')
        }
        const calculatedData  = new Date(`${date}T${time}:00Z`);
        const quiz = await Quiz.create({
            title,
            durationInMins,
            noOfQuestion,
            totalmarks,
            description,
            time : calculatedData,
            subId,
            subName,
            crt_by:req.user._id,
        });

        if(!quiz) throw new ApiError(500,"Quiz not created due to server error")

        await User.findByIdAndUpdate({_id:req.user._id},{
            $push:{
                quizhistory:quiz._id
            }
        })
        
        return res.json({
            success:true,
            message:"Quiz Created",
            quizId : quiz._id
        })

       
    } catch (e) {
        res.json({
            ...e,
            message: e.message
        })
    }
}
module.exports = { createQuiz }