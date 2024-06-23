const { Schema, default: mongoose } = require('mongoose');
const Question = require('../model/question.model');

const ResultSchema = new Schema({
    quizID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true
    },
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    earnmarks: {
        type: Number,
        default: 0
    },
    answer: {
        type: Schema.Types.Mixed 
    }
}, { timestamps: true });

module.exports = mongoose.model("Result", ResultSchema);
