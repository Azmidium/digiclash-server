"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const QuestionSetSchema = new mongoose_1.default.Schema({
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
module.exports = QuestionSetSchema;
//# sourceMappingURL=question_set.schemas.js.map