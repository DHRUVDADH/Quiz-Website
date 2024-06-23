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

<<<<<<< HEAD
router.get('/getanswer',verifyjwt,getAnswer)

=======
router.post('/getanswer',verifyjwt,getAnswer)
router.post('/quizsubmit',verifyjwt,quizsubmit)
>>>>>>> f54ce6eb971b93ad22d5a608505bc368d3c38f17
module.exports= router