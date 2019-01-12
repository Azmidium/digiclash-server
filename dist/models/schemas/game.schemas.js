"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const GameSchema = new mongoose_1.default.Schema({
    join_code: Number,
    player_count: Number,
    game_state: String
});
module.exports = GameSchema;
//# sourceMappingURL=game.schemas.js.map