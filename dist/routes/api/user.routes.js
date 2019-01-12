"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const question_set_controllers_1 = __importDefault(require("../../controllers/question_set.controllers"));
const logger_controllers_1 = require("../../controllers/logger.controllers");
const auth_controllers_1 = require("../../controllers/auth.controllers");
const router = express_1.default.Router();
router.post("/question_sets", auth_controllers_1.AuthManager.protectAuthRoute, (req, res, next) => question_set_controllers_1.default.uploadQuestionSet(req.body)
    .then(qsm => {
    question_set_controllers_1.default.addIDtoAccount(req.user._id, qsm.id)
        .then(() => {
        logger_controllers_1.LogManager.info(`Question set #${qsm.id} has been created`);
        res.send({ id: qsm.id });
    })
        .catch(err => logger_controllers_1.LogManager.errorWithResponse(err, res));
})
    .catch(err => logger_controllers_1.LogManager.errorWithResponse(err, res)));
router.delete("/question_set/:id", auth_controllers_1.AuthManager.protectAuthRoute, (req, res, next) => {
    let id = req.params["id"];
    question_set_controllers_1.default.removeQuestionSet(id)
        .then(() => {
        question_set_controllers_1.default.removeIDfromAccount(req.user._id, id)
            .then(() => {
            logger_controllers_1.LogManager.info(`Question set #${id} has been deleted`);
            res.send({ id });
        })
            .catch(err => logger_controllers_1.LogManager.errorWithResponse(err, res));
    })
        .catch(err => logger_controllers_1.LogManager.errorWithResponse(err, res));
});
router.put("/question_set/:id", auth_controllers_1.AuthManager.protectAuthRoute, (req, res, next) => {
    let id = req.params["id"];
    let question_set = req.body;
    question_set_controllers_1.default.updateQuestionSet(question_set)
        .then(() => {
        logger_controllers_1.LogManager.info(`Question set #${id} edited`);
        res.send({ id });
    })
        .catch(err => logger_controllers_1.LogManager.errorWithResponse(err, res));
});
router.get("/question_sets", auth_controllers_1.AuthManager.protectAuthRoute, (req, res, next) => {
    question_set_controllers_1.default.getQuestionSetIdsByOauth(req.user.oauthID)
        .then(ids => {
        question_set_controllers_1.default.getListOfQuestionSets(ids)
            .then(question_sets => res.send(question_sets))
            .catch(err => logger_controllers_1.LogManager.errorWithResponse(err, res));
    })
        .catch(err => logger_controllers_1.LogManager.errorWithResponse(err, res));
});
router.use(logger_controllers_1.LogManager.getErrorRouter());
module.exports = router;
//# sourceMappingURL=user.routes.js.map