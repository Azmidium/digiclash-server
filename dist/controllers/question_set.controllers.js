"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const account_models_1 = __importDefault(require("../models/account.models"));
const question_set_models_1 = __importDefault(require("../models/question_set.models"));
var QuestionSetManager;
(function (QuestionSetManager) {
    QuestionSetManager.getQuestionSetIdsByOauth = (oauthID) => account_models_1.default.findOne({ oauthID }).then(acc => acc.question_sets);
    QuestionSetManager.getAllQuestionSets = () => question_set_models_1.default.countDocuments({});
    QuestionSetManager.getListOfQuestionSets = (set_ids) => question_set_models_1.default.find({ _id: { $in: set_ids } }).then(QSMs => QSMs.map(qsm => qsm.toObject()));
    QuestionSetManager.getQuestionSet = (set_id) => question_set_models_1.default.findById(set_id).then(qsm => qsm.toObject());
    QuestionSetManager.uploadQuestionSet = (question_set) => new question_set_models_1.default(question_set).save();
    QuestionSetManager.removeQuestionSet = (id) => question_set_models_1.default.deleteOne({ _id: id });
    QuestionSetManager.updateQuestionSet = (question_set) => question_set_models_1.default.updateOne({ _id: question_set["_id"] }, question_set);
    QuestionSetManager.addIDtoAccount = (acc_id, id) => account_models_1.default.updateOne({ _id: acc_id }, { $push: { question_sets: id } });
    QuestionSetManager.removeIDfromAccount = (acc_id, id) => account_models_1.default.updateOne({ _id: acc_id }, { $pull: { question_sets: id } });
})(QuestionSetManager || (QuestionSetManager = {}));
module.exports = QuestionSetManager;
//# sourceMappingURL=question_set.controllers.js.map