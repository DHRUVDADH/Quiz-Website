const User=require('../model/user.model');
const { ApiError } = require('../utils/ApiError');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')

const tokengenerater=async (user)=>{
    try {
       
        const token = await jwt.sign({
            _id:user._id,
            student_id:user.student_id,
            email:user.email,
            usertype:user.usertype
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'15d'
        }
    )
        return token
    } catch (e) {
        console.log("error while generate token",e)
    }
}

const ispasswordcorrect=async(password,userpassword)=>{
    return await bcrypt.compare(password,userpassword)
}

const signup = async (req,res) =>{
    try {
        const {password,email,firstname,lastname,usertype,student_id}=req.body;

        if ( !firstname|| !lastname || !usertype|| !student_id || !password || !email ) {
            throw new ApiError(409,'All Field required')
          }
        
        const existone = await User.findOne({
            $or:[{student_id},{email}]
        }) 
        
        if(existone){
            throw new ApiError(409,'this user is already exiest')
        }
        

        const user=await User.create({
            username:student_id.toLowerCase(),
            password,
            email,
            firstname,
            lastname,
            usertype,
        })

        if(!user) throw new ApiError(500,"user not created due to server error")
        
        return res.json({
            success:true,
            message:"user signup successfully"
        })

    } catch (e) {
        res.json({
            ...e,
            message: e.message
        })
    }
}

const login=async (req,res)=>{
    try {

        const { email, password } = req.body;
        if (!email) {
            throw new ApiError(300, "please enter email");
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new ApiError(404, "User not exiest");
        }

        const ispasswordvalid = await ispasswordcorrect( password, user.password );
        if (ispasswordvalid === false) {
            throw new ApiError(401,"incorrect password")
        }

        const token = await tokengenerater(user);
        user.token = token;
        user.password = undefined;
    
        const options = {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure:true,
        };

        res.cookie("token", token, options);
        return res.status(200).json({
            success: true,
            token,
            user,
            message: "Logged in successfully",
        });

    } catch (e) {
        res.json({
            ...e,
            message: e.message
         })
    }
}

const updatedetail=async (req,res)=>{
    try {
        const {firstname,lastname,email}=req.body
        const user=req.user
        if(user.email !== email){
            const emailexiest=await User.findOne({email:email})
            if(emailexiest){
                return res.json({
                    success:false,
                    message:"this email has been resgistered"
                })
            }
        }
        user.email=email;
        user.firstname=firstname;
        user.lastname=lastname; 
        user.save({validateBeforeSave:false})
        return res.json({
            success:true,
            message:"update account detail successfully"
        })
    } catch (e) {
        console.log("error in updatedetail controller")
    }
}

const resetpassword=async (req,res)=>{
    try {
        const { oldpassword,newpassword }=req.body;
        const user=req.user
        const ispasswordcorrect=await ispasswordcorrect(oldpassword,user.password) 
        if(!(ispasswordcorrect)){
            return res.json({
                success:false,
                message:"enter correct oldpassword"
            })
        }
        user.password=newpassword;
        user.save({validateBeforeSave:false})
        return res.status(200).json({
            success:false,
            message:"Password updated successfully"
        })
    } catch (e) {
        console.log("error while resetpassword",e)
    }
}

const getdetail = async (req,res)=>{
    try {
        const user=req.user
        user.password=""
        return res.json({
            success:true,
            message:"detail fetch successfully",
            data:user
        })
    } catch (e) {
        console.log("error while getdetail",e)
    }
}

module.exports={ 
    signup,
    login,
    updatedetail,
    resetpassword,
    getdetail
}