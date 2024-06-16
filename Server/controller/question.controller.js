const User =require('../model/user.model')
const Question = require('../model/question.model')
const jwt = require('jsonwebtoken')

const quiztokengenerater = async (questionres) => {
    try {
        console.log("question response", questionres._id)
        const quiztoken = await jwt.sign({
            _id: questionres._id
        },
            "kol",
            {
                expiresIn: '1d'
            }
        )
        return quiztoken;
    } catch (e) {
        console.log("error while create quiz web token", e)
    }
}

const quiztokendecode = async (token) => {
    try {
        const decode = await jwt.verify(token, "kol")
        console.log("decode token of quiz is:", decode)
        return decode;
    } catch (e) {
        console.log("error while decode quiz token", e)
    }
}

const insertquiz = async (req, res) => {
    try {
        const user = req.user;
        if (user.usertype === "student") {
            return res.status(401).json({
                success: false,
                message: "not valid for create quiz"
            })
        }
        const { subject, totalquestion, department, totalmarks, question, A, B, C, D, answer } = req.body
        if (!subject || !totalquestion || !department || !totalmarks || !question || !A || !B || !C || !D || !answer) {
            return res.status(400).json({
                success: false,
                message: "give all require fields",
                
            })
        }

        const questionres = await Question.create({
            subject,
            totalquestion,
            totalmarks,
            department,
            multiqueston: [{
                question,
                A,
                B,
                C,
                D,
                answer
            }],
            crt_by: user._id
        })
        const quiztoken = await quiztokengenerater(questionres);

        questionres.multiqueston[0].answer = "";
        console.log("after save questions ->", questionres)
        return res.status(200).cookie("quiztoken", quiztoken, { httpOnly: true, secure: true }).json({
            success: true,
            message: "quiz created successfully",
            data: questionres,
            quiz_id:questionres._id
        })


    } catch (e) {
        console.log("error in question controller", e)
    }
}

const insertquestions = async (req, res) => {
    try {
        const user = req.user;
        if (user.usertype === "student") {
            return res.status(401).json({
                success: false,
                message: "not valid for create quiz"
            })
        }
        console.log("quiz token: >", req.cookies.quiztoken)
        const quiz_id = await quiztokendecode(req.cookies.quiztoken);
        const quizdetail = await Question.findById(quiz_id._id);
        console.log("quiz id is->", quizdetail)
        const { question, A, B, C, D, answer } = req.body;

        if (!question || !A || !B || !C || !D || !answer) {
            return res.status(400).json({
                success: false,
                message: "enter proper detail of mcq"
            })
        }
        const updatemcq = await quizdetail.multiqueston.push({ question, A, B, C, D, answer });
        console.log("updated mcq is:", updatemcq)
        console.log("quizdetail: ->", quizdetail)
        quizdetail.save({ validateBeforeSave: false })
        return res.status(200).json({
            success: true,
            message: "mcq update successfully"
        })
    } catch (e) {
        console.log("error in insertquestions", e)
    }
}

const getquizmcq = async ( req,res ) => {
    try {
        const quiz=req.quiz;
        const getquiz=await Question.findById(quiz?._id)
        if(!getquiz){
            return res.status(404).json({
                success:false,
                message:"sorry no quiz active right now"
            })
        }
        // console.log("getquiz is in controller:",getquiz).

        // console.log("req is in question controller",req)
        const loginuser = await User.findById(req.user._id)
        if(!loginuser)
            {
                console.log("loginuser not available in question controller in getquizmcq error")
            }
            let quizhistorys = loginuser.quizhistory;
            console.log("quiz history",quizhistorys)
            if(quizhistorys.includes(req.quiz._id))
                {
                    return res.status(200).json({
                        success:true,
                        message:"quiz mcq get successfully",
                        data:getquiz.multiqueston
                    })
                }
        loginuser.quizhistory.push(req.quiz._id)
        loginuser.save({validateBeforeSave:false})
        return res.status(200).json({
            success:true,
            message:"quiz mcq get successfully",
            data:getquiz.multiqueston
        })
        
    } catch (e) {
        console.log("error in getquizdetail controller",e)
    }
}

const quizstart = async ( req,res ) => {
    try {
        const user =req.user;
        if(user.usertype === 'student')
            {
                return res.status(400).json({
                    success:false,
                    message:"you are not valid for start quiz"
                })
            }
        const { quiz_id } = req.body
        if(!quiz_id) return res.status(404).json({success:false,message:"quiz id not found"})
        const quiz =await Question.findByIdAndUpdate(quiz_id,{is_running:true})
            return res.status(200).json({
                success:true,
                message:"detail updated successfully"
            })
    } catch (e) {
        console.log("error in quiz start controller ",e)
    }
}

module.exports = { insertquiz, insertquestions, getquizmcq,quizstart }