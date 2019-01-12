"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const game_server_controllers_1 = require("./game_server.controllers");
const game_state_enums_1 = __importDefault(require("../models/enums/game_state.enums"));
var GameManager;
(function (GameManager) {
    const gameServers = [];
    GameManager.getGameServers = () => gameServers;
    GameManager.getGameServerByCode = (join_code) => gameServers.filter(server => join_code === server.getInfo().join_code)[0];
    GameManager.getGameByCode = (join_code) => gameServers
        .filter(server => join_code === server.getInfo().join_code)
        .map(server => server.getGame())[0];
    GameManager.createGame = (question_set) => {
        let info = {
            join_code: getValidJoinCode(),
            player_count: 0,
            game_state: game_state_enums_1.default.LOBBY,
            current_question: -1
        };
        let players = [];
        let game = {
            info,
            question_set,
            players
        };
        let gameServer = new game_server_controllers_1.GameServer(game);
        gameServers.push(gameServer);
        return gameServer;
    };
    const getValidJoinCode = () => {
        let join_code = generateJoinCode();
        while (!!GameManager.getGameByCode(join_code))
            join_code = generateJoinCode();
        return join_code;
    };
    const generateJoinCode = () => Math.floor(Math.random() * 100000000);
})(GameManager || (GameManager = {}));
module.exports = GameManager;
//# sourceMappingURL=game.controllers.js.map