"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const game_schemas_1 = __importDefault(require("./schemas/game.schemas"));
const Game = mongoose_1.default.model("Game", game_schemas_1.default);
module.exports = Game;
//# sourceMappingURL=game.models.js.map