import mongoose from "mongoose";

const QuestionSetSchema = new mongoose.Schema({
  title: String,
  keywords: [String],
  description: String,
  public: Boolean,

  date_created: Number,
  date_edited: Number,

  leaderboard_time: Number,
  transition_time: Number,
  timed: Boolean,

  questions: [
    {
      text: String,
      answer_time: Number,
      options: [
        {
          text: String,
          points: Number,
          correct: Boolean
        }
      ]
    }
  ]
});

export = QuestionSetSchema;
