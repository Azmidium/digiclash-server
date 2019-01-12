"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const winston_1 = __importDefault(require("winston"));
const { transports, createLogger, format } = winston_1.default;
const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "digiclash.log" })
    ]
});
var LogManager;
(function (LogManager) {
    LogManager.info = (message) => logger.info(message);
    LogManager.debug = (debug) => logger.debug(debug);
    LogManager.error = (err) => logger.error(err);
    LogManager.infoWithResponse = (message, res) => {
        logger.info(message);
        res.send({ message });
    };
    LogManager.errorWithResponse = (err, res) => {
        logger.error(err);
        res.send({});
    };
    LogManager.throwAuthError = (err, done) => {
        logger.error(err);
        done(err);
    };
    LogManager.getErrorRouter = () => {
        return express_1.default.Router().use((req, res, next) => {
            const message = "Incorrect request to: " + req.originalUrl;
            logger.error(message);
            res.send({ message });
        });
    };
})(LogManager || (LogManager = {}));
exports.LogManager = LogManager;
//# sourceMappingURL=logger.controllers.js.map