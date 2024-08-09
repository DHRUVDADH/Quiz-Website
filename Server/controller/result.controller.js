const User = require('../model/user.model')
const Result = require('../model/result.model')
const Question = require('../model/question.model')
const Quiz = require("../model/quiz.model")
const { ApiError } = require("../utils/ApiError")

const quizsubmit = async (req, res) => {
    try {
        const user = req.user;
        const { quizID } = req.query;

        // Fetch the specific result entry for the student and quiz
        const result_detail = await Result.findOne({ quizID: quizID, studentID: user._id });

        if (!result_detail) {
            return res.status(404).json({
                success: false,
                message: "No result entry found for the student and quiz"
            });
        }

        const studentAnswers = result_detail.answer; // Ensure this is the correct answers object
        const questions_detail = await Question.findOne({ quizID: quizID });

        if (!questions_detail) {
            return res.status(404).json({
                success: false,
                message: "No questions found for the quiz"
            });
        }

        const questions = questions_detail.questions;
        let score = 0;

        // Iterate through questions and calculate score
        questions.forEach((ques) => {
            if (ques._id in studentAnswers) {
                if (studentAnswers[ques._id] === ques.correctAnswer) {
                    score += Number(ques.marks);
                }
            } else {
                console.error(`Missing answer for question ID: ${ques._id}`);
                // You might want to continue or handle missing answers differently
            }
        });

        // Update result with earned marks
        result_detail.earnmarks = score;
        await result_detail.save();

        // Update quiz response
        const quiz = await Quiz.findById(quizID);
        if (user.usertype === 'student') {
            if (!quiz.studentResponce.includes(user._id)) {
                quiz.studentResponce.push(user._id);
                await quiz.save();
            }
        }

        // Update student quiz history
        await User.findByIdAndUpdate(
            user._id,
            { $addToSet: { quizhistory: quizID } },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            success: true,
            message: "Quiz submitted successfully",
            earnedMarks: score // Optional: include the score in the response
        });

    } catch (e) {
        console.error("Error in quiz submit controller:", e);
        res.status(500).json({
            success: false,
            message: 'An error occurred during quiz submission',
            error: e.message
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
        const { resultID } = req.query; 
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
