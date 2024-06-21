const { Schema, default: mongoose } = require("mongoose");

const OptionSchema = new Schema({
  key: { type: String, required: true },
  ans: { type: String, required: true },
});

const multiquestonSchema = new Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [OptionSchema], required: true },
  correctAnswer: { type: String, required: true },
  marks: { type: String, required: true },
});

const questionSchema = new Schema(
  {
    questions: [multiquestonSchema],
    quizID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    crt_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
