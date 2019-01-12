import express from "express";

import { LogManager } from "../../controllers/logger.controllers";

import mongoose from "mongoose";

import QuestionSetManager from "./../../controllers/question_set.controllers";
import { QuestionSetObj } from "./../../models/objects/question_set.objects";

const router = express.Router();

router.get("/count", (req, res, next) => {
  QuestionSetManager.getAllQuestionSets()
    .then(count => res.send({ count }))
    .catch(err => LogManager.errorWithResponse(err, res));
});

router.get("/id/:id", (req, res, next) => {
  let id: string = req.params["id"];

  QuestionSetManager.getQuestionSet(mongoose.Types.ObjectId(id))
    .then(data => {
      let question_set: QuestionSetObj = data;
      res.send({ question_set });
    })
    .catch(err => LogManager.errorWithResponse(err, res));
});

router.use(LogManager.getErrorRouter());

export = router;
