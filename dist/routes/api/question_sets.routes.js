"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const logger_controllers_1 = require("../../controllers/logger.controllers");
const mongoose_1 = __importDefault(require("mongoose"));
const question_set_controllers_1 = __importDefault(require("./../../controllers/question_set.controllers"));
const router = express_1.default.Router();
router.get("/count", (req, res, next) => {
    question_set_controllers_1.default.getAllQuestionSets()
        .then(count => res.send({ count }))
        .catch(err => logger_controllers_1.LogManager.errorWithResponse(err, res));
});
router.get("/id/:id", (req, res, next) => {
    let id = req.params["id"];
    question_set_controllers_1.default.getQuestionSet(mongoose_1.default.Types.ObjectId(id))
        .then(data => {
        let question_set = data;
        res.send({ question_set });
    })
        .catch(err => logger_controllers_1.LogManager.errorWithResponse(err, res));
});
router.use(logger_controllers_1.LogManager.getErrorRouter());
module.exports = router;
//# sourceMappingURL=question_sets.routes.js.map