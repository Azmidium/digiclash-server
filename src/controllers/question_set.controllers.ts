import Account from "../models/account.models";
import { AccountObj } from "../models/objects/account.objects";

import QuestionSetModel from "../models/question_set.models";
import { QuestionSetObj } from "../models/objects/question_set.objects";

import { LogManager } from "./logger.controllers";

import mongoose from "mongoose";

namespace QuestionSetManager {
  export const getQuestionSetIdsByOauth = (oauthID: string) =>
    Account.findOne({ oauthID }).then(acc => acc.question_sets);

  export const getAllQuestionSets = () => QuestionSetModel.countDocuments({});

  export const getListOfQuestionSets = (set_ids: string[]) =>
    QuestionSetModel.find({ _id: { $in: set_ids } }).then(QSMs =>
      QSMs.map(qsm => qsm.toObject() as QuestionSetObj)
    );

  export const getQuestionSet = (set_id: mongoose.Types.ObjectId) =>
    QuestionSetModel.findById(set_id).then(qsm => qsm.toObject());

  export const uploadQuestionSet = (question_set: QuestionSetObj) =>
    new QuestionSetModel(question_set).save();

  export const removeQuestionSet = (id: string) =>
    QuestionSetModel.deleteOne({ _id: id });

  export const updateQuestionSet = (question_set: QuestionSetObj) =>
    QuestionSetModel.updateOne({ _id: question_set["_id"] }, question_set);

  export const addIDtoAccount = (acc_id: string, id: string) =>
    Account.updateOne({ _id: acc_id }, { $push: { question_sets: id } });

  export const removeIDfromAccount = (acc_id: string, id: string) =>
    Account.updateOne({ _id: acc_id }, { $pull: { question_sets: id } });
}

export = QuestionSetManager;
