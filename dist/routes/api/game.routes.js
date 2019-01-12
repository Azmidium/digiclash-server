"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const game_controllers_1 = __importDefault(require("../../controllers/game.controllers"));
const logger_controllers_1 = require("../../controllers/logger.controllers");
const auth_controllers_1 = require("../../controllers/auth.controllers");
const router = express_1.default.Router();
// Join a game
router.use("/join/:code/:disp_name", (req, res, next) => {
    let code = Number(req.params["code"]);
    let display_name = req.params["disp_name"];
    let gameServer = game_controllers_1.default.getGameServerByCode(code);
    if (!!!gameServer)
        return logger_controllers_1.LogManager.infoWithResponse("Game with this join code doesn't exist", res);
    let user = gameServer.createUser(display_name);
    let info = gameServer.getInfo();
    let set = gameServer.getSet();
    res.send({ user, info, set });
});
// Create a game
router.post("/create", auth_controllers_1.AuthManager.protectAuthRoute, (req, res, next) => {
    let game = game_controllers_1.default.createGame(req.body).getGame();
    logger_controllers_1.LogManager.info(`Creating a game with join code ${game.info.join_code}`);
    res.send({ game });
});
module.exports = router;
//# sourceMappingURL=game.routes.js.map