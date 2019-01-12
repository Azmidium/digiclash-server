import mongoose from "mongoose";

import { QuestionSetObj } from "./objects/question_set.objects";

import QuestionSetSchema from "./schemas/question_set.schemas";

interface QuestionSetModel extends QuestionSetObj, mongoose.Document {}

const QuestionSet = mongoose.model<QuestionSetModel>(
  "QuestionSet",
  QuestionSetSchema
);

export = QuestionSet;
