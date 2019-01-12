"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const logger_controllers_1 = __importDefault(require("./logger.controllers"));
var ErrorManager;
(function (ErrorManager) {
    ErrorManager.throwError = (err) => logger_controllers_1.default.error(err);
    ErrorManager.throwAuthError = (err, done) => {
        logger_controllers_1.default.error(err);
        done(err);
    };
    ErrorManager.getErrorRouter = () => {
        return express_1.default.Router().use((req, res, next) => {
            const message = "Incorrect request to: " + req.originalUrl;
            logger_controllers_1.default.error(message);
            res.send({ message });
        });
    };
})(ErrorManager || (ErrorManager = {}));
module.exports = ErrorManager;
//# sourceMappingURL=error.controllers.js.map