const Quiz =require('../model/quiz.model')
const User =require('../model/user.model')
const Question = require('../model/question.model')
const jwt = require('jsonwebtoken')
const {ApiError} = require('../utils/ApiError')



const createQuiz = async (req,res)=>{
    try {
        const { title , durationInMins , noOfQuestion , totalmarks , description , date , time , subId , subName}=req.body;

        if (!title || !durationInMins || !noOfQuestion || !totalmarks || !description || !date || !time || !subId || !subName) {
            throw new ApiError(409,'All Field required')
            }
        console.log("Printing Title",title , time)
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

        const questionCollection = Question.create({
            crt_by:req.user._id,
            quizID:quiz._id,
        })

        await Quiz.findByIdAndUpdate({_id:quiz._id},{
            $set:{
                questionID:questionCollection._id
            }
        })


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

const getAllQuizes = async (req,res)=>{
    try {
        const user = req.user
        if(!user._id)
            {
                console.log("user not exist")
                return res.status(404).json({
                    success:false,
                    message:"User id not get"
                })
            }
        const quiz = await Quiz.find({crt_by:user._id})
        console.log("Quiz get by faculty ",quiz)
        return res.status(200).json({
            success:true,
            message:"quiz detail fetch successfully",
            data:quiz
        })
    } catch (e) {
        res.json({
            ...e,
            message: e.message
        })
    }
}

const getQuiz = async (req,res)=>{
    try {
        const {quizID}=req.query;

        if (!quizID) {
            throw new ApiError(409,'Quiz ID required')
            }
        
        const quiz = await Quiz.findOne({
            _id:quizID
        }) 
        
        if(!quiz){
            throw new ApiError(409,"You Don't have this Quiz")
        }

        const question = await Question.findOne({
            quizID:quiz._id
        },{questions:1}) 

        if(!question){
            throw new ApiError(409,"You Don't have this Question")
        }
        
        return res.json({
            success:true,
            message:"Quiz Found",
            quiz : quiz,
            question:question.questions
        })

       
    } catch (e) {
        res.json({
            ...e,
            message: e.message
        })
    }

}

const getQuestions = async (req,res)=>{
    try {
        const {quizID}=req.query;

        if (!quizID) {
            throw new ApiError(409,'Quiz ID required')
            }

        const user = await User.findById(req.user._id)


          if(user.quizhistory.indexOf(quizID) != -1 && user.usertype!=='faculty')
            {
              return res.json({
                success:false,
                message:"you have already submit quiz"
              })
            }

        const existone = await Quiz.findOne({
            _id:quizID,
        }) 
        
        if(!existone){
            throw new ApiError(409,"You Don't have this Quiz")
        }

        const questions = await Question.findOne({quizID:quizID})
        const mcq = questions.questions;
        
        for(let i=0;i<mcq.length;i++)
          {
            mcq[i].correctAnswer=""
          }
        
        return res.json({
            success:true,
            message:"Quiz Found",
            quiz : existone,
            mcq : mcq
        })

       
    } catch (e) {
        res.json({
            ...e,
            message: e.message
        })
    }

}

const setQuestions = async (req, res) => {
  try {
    const { quizID, questions } = req.body;

    if (!quizID || questions.length == 0) {
      throw new ApiError(409, "Quiz ID and Question required");
    }

    if(!validateQuestions(questions)){
        throw new ApiError(409, "Question missis the field");
    }

    const existone = await Question.findOneAndUpdate(
      {
        quizID: quizID,
        crt_by: req.user._id,
      },
      {
        $set: {
          questions: questions,
        },
      }
    );

    if (!existone) {
      throw new ApiError(409, "You Don't have this Quiz");
    }

    return res.json({
      success: true,
      message: "Quiz Updated",
      quiz: existone,
    });

  } catch (e) {
    res.json({
      ...e,
      message: e.message,
    });
  }
};


const validateQuestions = (questions) => {
  const errors = [];

  questions.forEach((question, index) => {
    const { question: q, options, correctAnswer, marks } = question;

    // Validate question field
    if (!q || typeof q !== 'string' || q.trim().length === 0) {
      errors.push(`Question ${index + 1} is invalid: Question must be a non-empty string.`);
    }

    // Validate options
    if (!Array.isArray(options) || options.length !== 4) {
      errors.push(`Question ${index + 1} is invalid: Options must be an array of 4 objects.`);
    } else {
      options.forEach((option, optionIndex) => {
        const { key, ans } = option;
        if (key !== 'A' && key !== 'B' && key !== 'C' && key !== 'D') {
          errors.push(`Question ${index + 1}, Option ${optionIndex + 1} is invalid: Key must be 'A', 'B', 'C', or 'D'.`);
        }
        if (!ans || typeof ans !== 'string' || ans.trim().length === 0) {
          errors.push(`Question ${index + 1}, Option ${optionIndex + 1} is invalid: Answer must be a non-empty string.`);
        }
      });
    }

    // Validate correctAnswer
    if (!correctAnswer || typeof correctAnswer !== 'string' || !['A', 'B', 'C', 'D'].includes(correctAnswer)) {
      errors.push(`Question ${index + 1} is invalid: Correct answer must be 'A', 'B', 'C', or 'D'.`);
    }

    // Validate marks
    if (!marks || isNaN(marks) || parseInt(marks) <= 0) {
      errors.push(`Question ${index + 1} is invalid: Marks must be a positive number.`);
    }
  });

  if (errors.length > 0) {
    return false; // Return false if there are errors
  } else {
    return true; // Return true if all questions are valid
  }
};





module.exports = { createQuiz, getAllQuizes, getQuiz, getQuestions, setQuestions };