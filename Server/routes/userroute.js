const express=require('express')
const router=express.Router()
const {updateAnswer , getAnswer, quizsubmit}  = require("../controller/result.controller")
const { signup,login}=require('../controller/user.controller')
const { verifyjwt , verifyFaculty } = require('../middleware/auth.middleware')
const { createQuiz,getAllQuizes,getQuiz,setQuestions,getQuestions } = require('../controller/question.controller')
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
module.exports= router