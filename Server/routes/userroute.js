const express=require('express')
const router=express.Router()
const {updateAnswer , getAnswer, quizsubmit}  = require("../controller/result.controller")
const { signup,login, student_dashboard, quiz_response, faculty_dashboard}=require('../controller/user.controller')
const { verifyjwt , verifyFaculty } = require('../middleware/auth.middleware')
const { createQuiz,getAllQuizes,getQuiz,setQuestions,getQuestions,getquizres } = require('../controller/question.controller')
// const {uploadoncloudinary}=require('../config/cloudinary') // Extra

router.post('/signup',signup)
router.post('/login',login)
router.post('/create',verifyjwt,verifyFaculty,createQuiz);
router.get('/quizdetails',verifyjwt,verifyFaculty,getQuiz);
router.post('/setquestions',verifyjwt,verifyFaculty,setQuestions);

router.get('/getquizes',verifyjwt,verifyFaculty,getAllQuizes)
router.get('/getquestions',verifyjwt,getQuestions)

router.post('/updateanswer',verifyjwt,updateAnswer)

router.get('/getanswer',verifyjwt,getAnswer)
router.get('/quizsubmit',verifyjwt,quizsubmit)

router.get('/studentdash',verifyjwt,student_dashboard)
router.get('/getresult',verifyjwt,quiz_response)

router.get('/facultydash',verifyjwt,verifyFaculty,faculty_dashboard)
router.get('/quizresponse',verifyjwt,verifyFaculty,getquizres) //
module.exports= router