const { Schema, default: mongoose } = require("mongoose");

const quizSchema = new Schema(
  {
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    time: {
        type: Date,
        require: true,
    },
    subId: {
        type: String,
        require: true,
    },
    subName: {
        type: String,
        require: true,
    },
    durationInMins: {
        type: Number,
        require: true,
    },
    noOfQuestion: {
        type: Number,
        require: true,
    },
    totalmarks: {
        type: Number,
        require: true,
    },
    crt_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    is_running: {
        type: Boolean,
        default: false,
    },
    questionID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
