const jwt=require('jsonwebtoken')
const ApiError=require('../utils/ApiError')
const User=require('../model/user.model')

const verifyjwt=async (req,res,next)=>{
    try {
        const usertoken=await req.cookies.atoken || req.header("Authorization")?.replace("Bearer ","");
        if(!usertoken)
            {
                throw new ApiError(401,"token not found")
            }
        
        const decodetoken=await jwt.verify(usertoken,"kol")
        console.log("decode token ->",decodetoken)
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

module.exports={verifyjwt}