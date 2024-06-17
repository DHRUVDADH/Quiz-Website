const User = require('../model/user.model')
const Result =require('../model/result.model')
const Question =require('../model/question.model')

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

module.exports={quizsubmit}