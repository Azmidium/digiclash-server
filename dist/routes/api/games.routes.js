"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const logger_controllers_1 = require("../../controllers/logger.controllers");
const game_controllers_1 = __importDefault(require("../../controllers/game.controllers"));
const router = express_1.default.Router();
router.get("/list", (req, res, next) => {
    logger_controllers_1.LogManager.info("Request recieved for list of games");
    let games = game_controllers_1.default.getGameServers().map(server => server.getGame());
    res.send({ games });
});
router.get("/code/:code", (req, res, next) => {
    let code = Number(req.params["code"]);
    let game = game_controllers_1.default.getGameByCode(code);
    logger_controllers_1.LogManager.info(`Request for game with join code ${code} recieved`);
    res.send({ game });
});
router.use(logger_controllers_1.LogManager.getErrorRouter());
module.exports = router;
//# sourceMappingURL=games.routes.js.map