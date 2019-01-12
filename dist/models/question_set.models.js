"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const question_set_schemas_1 = __importDefault(require("./schemas/question_set.schemas"));
const QuestionSet = mongoose_1.default.model("QuestionSet", question_set_schemas_1.default);
module.exports = QuestionSet;
//# sourceMappingURL=question_set.models.js.map