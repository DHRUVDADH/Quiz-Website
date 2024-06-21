const jwt = require('jsonwebtoken')
const {ApiError} = require('../utils/ApiError')
const User=require('../model/user.model')

const verifyjwt=async (req,res,next)=>{
    try {
        const usertoken = await req.cookies.token || req.header("Authorization")?.replace("Bearer ","");
        if(!usertoken){
                throw new ApiError(401,"token not found")
            }
        
        const decodetoken = await jwt.verify(usertoken,process.env.JWT_SECRET)
        const user=await User.findById(decodetoken?._id)

        if(!user){
            throw new ApiError(401,"invalid user")
        }
        req.user=user;
        next()
    } catch (e) {
        console.log("error while verify json web token",e)
        res
        .status(500)
        .json({
            success:false,
            message:"token not verify succesfully due to server error"
        })
    }
}

const verifyFaculty=async (req,res,next)=>{
    try {

        if(!req.user){
            throw new ApiError(401,"Can't Get User In req")
        }
        console.log(req.user)
        if(req.user.usertype !=="faculty"){
            throw new ApiError(401,"You are Not Faculty")
        }

        next();
        
    } catch (e) {
        console.log("error while verify json web token",e)
        res
        .status(500)
        .json({
            success:false,
            message:"token not verify succesfully due to server error"
        })
    }
}

const verifyStudent=async (req,res,next)=>{
    try {

        if(!req.user){
            throw new ApiError(401,"Can't Get User In req")
        }

        if(req.user.usetType !=="student"){
            throw new ApiError(401,"You are Not Student")
        }
        
        next();
        
    } catch (e) {

        res
        .status(500)
        .json({
            success:false,
            message:"token not verify succesfully due to server error"
        })
    }
}

module.exports={verifyjwt , verifyFaculty , verifyStudent}