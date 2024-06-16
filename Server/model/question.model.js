const { Schema, default: mongoose } = require('mongoose')

const multiquestonSchema = new Schema({
    question: {
        type: String,
        require: true
    },
    A: {
        type: String,
        require: true,
    },
    B: {
        type: String,
        require: true,
    },
    C: {
        type: String,
        require: true,
    },
    D: {
        type: String,
        require: true,
    },
    answer: {
        type: String,
        enum: ["A", "B", "C", "D"]
    }
})

const questionSchema = new Schema({
    multiqueston: [
        multiquestonSchema
    ],
    subject: {
        type: String,
        require: true
    },
    totalquestion:{
        type: Number,
        require:true
    },
    department:{
        type:String,
        require:true
    },
    totalmarks:{
        type:Number,
        require:true
    },
    crt_by:{
        type:String,
        require:true
    },
    is_running:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })

module.exports=mongoose.model("Question",questionSchema)