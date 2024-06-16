const express=require('express')
const router=express.Router()
const { upload }=require('../middleware/multer.middleware')
const { signup,
    login,
    logout,
    updatedetail,
    getdetail,
    resetpassword }=require('../controller/user.controller')
const { verifyjwt } = require('../middleware/auth.middleware')
const { isrunning } =require('../middleware/quizrunning.middleware')
const { insertquiz,
    insertquestions,
    getquizmcq,
    quizstart } = require('../controller/question.controller')
const { quizsubmit } = require('../controller/result.controller')
// const {uploadoncloudinary}=require('../config/cloudinary') // Extra

router.post('/Signup',upload.single("avtar"),signup)

// router.post('/pdf',upload.single("pdf"),async (req,res)=>{
//     try {
//         const pdflocalpath=await req.file.path;
//         console.log("local file path:->",pdflocalpath)
//         const response=await uploadoncloudinary(pdflocalpath);
//         console.log("response after upload pdf-> f_auto,q_auto",response)
//         let ressplit=response.url.split('/') // here we can also use replace function
//         console.log("spliteed type:",typeof(ressplit),"splited array",ressplit)
//         ressplit[6]='f_auto,q_auto'
//         let url=''
//         for(let i=0;i<ressplit.length;i++)
//             {
//                 url += ressplit[i]
//                 url += '/'
//             }
//             console.log("url is:",url)
//         return res.json({
//             success:true,
//             message:"pdf upload",
//             response:response.url
//         })
//     } catch (e) {
//         console.log("error in pdf uploader",e)
//     }
// })


router.post('/login',login)
router.post('/logout',verifyjwt,logout)
router.patch('/updatedetail',verifyjwt,updatedetail)
router.patch('/resetpassword',verifyjwt,resetpassword)
router.get('/getdetail',verifyjwt,getdetail)
router.post('/createquiz',verifyjwt,insertquiz)
router.post('/inserquestion',verifyjwt,insertquestions)
router.get('/getquiz',verifyjwt,isrunning,getquizmcq)
router.patch('/startquiz',verifyjwt,quizstart) // isnot working properliy controller not crt
//get all quiz detail for uper router in easy to find quiz by id here static id give so quiz fatch successfully
router.post('/quizsubmit',verifyjwt,quizsubmit)

module.exports= router