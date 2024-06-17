const cloudinary=require('cloudinary').v2
const fs=require('fs')

require("dotenv").config()
cloudinary.config({
    cloud_name: "mohil",
    api_key: "748936829531461",
    api_secret: "4WM18GrixG_2zPG1kE9008xtLp8"
})

const uploadoncloudinary=async(localfilepath)=>{
    try {
        if(!localfilepath) return null
        const res=await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
        fs.unlinkSync(localfilepath)
        return res;
    } catch (e) {
        fs.unlinkSync(localfilepath)
        console.log("error while uploadonclodinary",e)
    }
}

module.exports={uploadoncloudinary}
