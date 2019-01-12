"use strict";
var GameState;
(function (GameState) {
    GameState[GameState["LOBBY"] = 0] = "LOBBY";
    GameState[GameState["TRANSITION"] = 1] = "TRANSITION";
    GameState[GameState["QUESTION"] = 2] = "QUESTION";
    GameState[GameState["SHOW_ANSWER"] = 3] = "SHOW_ANSWER";
    GameState[GameState["LEADERBOARD"] = 4] = "LEADERBOARD";
    GameState[GameState["FINISH"] = 5] = "FINISH";
})(GameState || (GameState = {}));
module.exports = GameState;
//# sourceMappingURL=game_state.enums.js.map