require('dotenv').config()
const mongoose=require('mongoose')

const dbconnect=async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/quiz").then(()=>{
            console.log("database connected succesfully")
        })
    } catch (e) {
        console.log("error while coonect database",e)
    }
}

module.exports={dbconnect}