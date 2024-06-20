const express=require('express')
const router=express.Router()
const { signup,login}=require('../controller/user.controller')
const { verifyjwt , verifyFaculty } = require('../middleware/auth.middleware')
const { createQuiz,getAllQuizes } = require('../controller/question.controller')
// const {uploadoncloudinary}=require('../config/cloudinary') // Extra

router.post('/signup',signup)
router.post('/login',login)
router.post('/create',verifyjwt,verifyFaculty,createQuiz);

router.get('/getquizes',verifyjwt,verifyFaculty,getAllQuizes)


module.exports= router