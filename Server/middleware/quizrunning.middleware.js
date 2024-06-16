const Question = require('../model/question.model')

const isrunning = async (req, res, next) => {
    try {
        const user = await req.user;
        
        const getedquiz = await Question.findOne({ $and: [
                { crt_by: user._id },
                { is_running:true }
            ]})
    // console.log("get quiz :", getedquiz)
// req.user = getedquiz
req.quiz = getedquiz
next()
    } catch (e) {
    console.log("error in quizisrunning middleware", e)
}
}

module.exports = { isrunning }