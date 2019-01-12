import express from "express";

import QuestionSetManager from "../../controllers/question_set.controllers";
import { QuestionSetObj } from "../../models/objects/question_set.objects";

import { LogManager } from "../../controllers/logger.controllers";
import { AuthManager } from "../../controllers/auth.controllers";

const router = express.Router();

router.post("/question_sets", AuthManager.protectAuthRoute, (req, res, next) =>
  QuestionSetManager.uploadQuestionSet(req.body as QuestionSetObj)
    .then(qsm => {
      QuestionSetManager.addIDtoAccount(req.user._id, qsm.id)
        .then(() => {
          LogManager.info(`Question set #${qsm.id} has been created`);
          res.send({ id: qsm.id });
        })
        .catch(err => LogManager.errorWithResponse(err, res));
    })
    .catch(err => LogManager.errorWithResponse(err, res))
);

router.delete(
  "/question_set/:id",
  AuthManager.protectAuthRoute,
  (req, res, next) => {
    let id: string = req.params["id"];

    QuestionSetManager.removeQuestionSet(id)
      .then(() => {
        QuestionSetManager.removeIDfromAccount(req.user._id, id)
          .then(() => {
            LogManager.info(`Question set #${id} has been deleted`);
            res.send({ id });
          })
          .catch(err => LogManager.errorWithResponse(err, res));
      })
      .catch(err => LogManager.errorWithResponse(err, res));
  }
);

router.put(
  "/question_set/:id",
  AuthManager.protectAuthRoute,
  (req, res, next) => {
    let id: string = req.params["id"];
    let question_set: QuestionSetObj = req.body as QuestionSetObj;

    QuestionSetManager.updateQuestionSet(question_set)
      .then(() => {
        LogManager.info(`Question set #${id} edited`);
        res.send({ id });
      })
      .catch(err => LogManager.errorWithResponse(err, res));
  }
);

router.get("/question_sets", AuthManager.protectAuthRoute, (req, res, next) => {
  QuestionSetManager.getQuestionSetIdsByOauth(req.user.oauthID)
    .then(ids => {
      QuestionSetManager.getListOfQuestionSets(ids as string[])
        .then(question_sets => res.send(question_sets))
        .catch(err => LogManager.errorWithResponse(err, res));
    })
    .catch(err => LogManager.errorWithResponse(err, res));
});

router.use(LogManager.getErrorRouter());

export = router;
