const User = require('../model/user.model')
const Result = require('../model/result.model')
const Question = require('../model/question.model')
const Quiz = require("../model/quiz.model")
const { ApiError } = require("../utils/ApiError")

const quizsubmit = async (req, res) => {
    try {
        const user = req.user;
        const { quizID } = req.query;

        const result_detail = await Result.findOne({ quizID: quizID });

        if (!result_detail) {
            return res.status(404).json({
                success: false,
                message: "server error in result"
            })
        }

        const answer = result_detail.answer;
        const questions_detail = await Question.findOne({ quizID: quizID });

        if (!questions_detail) {
            return res.status(404).json({
                success: false,
                message: "server error in question"
            })
        }

        const question = questions_detail.questions;

        var score = 0;
        question.forEach((ques) => {
            if (ques._id in answer) {
                if (answer[ques._id] === ques.correctAnswer) {
                    score += ques.marks;
                }
            } else {
                throw new ApiError(409, "Missing Answer")
            }
        });

        result_detail.earnmarks=score;
        const finRES = await result_detail.save();
        const quiz =await Quiz.findById(quizID)
        if(user.usertype==='student'){
            quiz.studentResponce.push(user._id)
            await quiz.save();
        }

        // const student = await User.findById(user._id)
        // if(!student)
        //     {
        //         throw new ApiError(409,"user not get successfully")
        //     }
        // student.quizhistory.push(quizID)
        // await student.save();

        const updatedStudent = await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { quizhistory: quizID } },
            { new: true, upsert: true }
          );


        return res.status(200).json({
            success: true,
            message: "quiz submit successfully",
        });

    } catch (e) {

        console.log("error in quiz submit controller", e);
        res.json({
            ...e,
            message: e.message
        });
        
    }
}

const updateAnswer = async (req, res) => {
    try {
        const { quizID, questionID, ansVal } = req.body;
        if (!quizID || !questionID || !ansVal) {
            throw new ApiError(409, 'Filled Missing')
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
            success: true,
            message: "Quiz Found",
            Result: Resu
        })


    } catch (e) {
        console.log(e)
        res.json({
            ...e,
            message: e.message
        })
    }
}

const getAnswer = async (req, res) => {
    try {
        const { quizID } = req.query;
        if (!quizID) {
            throw new ApiError(409, 'Quiz Id Missing')
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

const submitquizdetail = async (req,res)=>{
    try {
        const { resultID } = req.query; // if you wnt in query than do it
        const resultinfo = await Result.findById(resultID).select('-_id -createdAt -__v');
        const user = await User.findById(resultinfo.studentID).select('-_id -password -email -usertype -createdAt -updatedAt -__v -avatar -accesstoken -resulthistory -quizhistory -avtar');
        const QuizQuestion = await Question.findOne({quizID:resultinfo.quizID}).select('-_id -crt_by -createdAt -updatedAt -__v');
        const quizdetail = await Quiz.findById(resultinfo.quizID).select('-_id -studentResponce -description -time -durationInMins -noOfQuestion -crt_by -is_running -createdAt -updatedAt -__v ');

        return res.status(200).json({
            success:true,
            message:"Quiz submit res Found",
            resultinfo:resultinfo,
            user:user,
            quizdetail:quizdetail,
            QuizQuestion:QuizQuestion
        })

    } catch (e) {
        console.log(e)
        res.json({
            ...e,
            message: e.message
        })
    }
}

module.exports = { quizsubmit, updateAnswer, getAnswer,submitquizdetail }
