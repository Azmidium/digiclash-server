"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const game_routes_1 = __importDefault(require("./api/game.routes"));
const games_routes_1 = __importDefault(require("./api/games.routes"));
const question_sets_routes_1 = __importDefault(require("./api/question_sets.routes"));
const user_routes_1 = __importDefault(require("./api/user.routes"));
const router = express_1.default.Router();
router.use("/game", game_routes_1.default);
router.use("/games", games_routes_1.default);
router.use("/question_sets", question_sets_routes_1.default);
router.use("/user", user_routes_1.default);
module.exports = router;
//# sourceMappingURL=api.routes.js.map