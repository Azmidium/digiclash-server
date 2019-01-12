import { GameServer } from "./game_server.controllers";
import { GameObj, GameInfoObj, UserObj } from "../models/objects/game.objects";
import { QuestionSetObj } from "../models/objects/question_set.objects";
import GameState from "../models/enums/game_state.enums";

namespace GameManager {
  const gameServers: GameServer[] = [];

  export const getGameServers = () => gameServers;

  export const getGameServerByCode = (join_code: number) =>
    gameServers.filter(server => join_code === server.getInfo().join_code)[0];

  export const getGameByCode = (join_code: number) =>
    gameServers
      .filter(server => join_code === server.getInfo().join_code)
      .map(server => server.getGame())[0];

  export const createGame = (question_set: QuestionSetObj) => {
    let info: GameInfoObj = {
      join_code: getValidJoinCode(),
      player_count: 0,
      game_state: GameState.LOBBY,
      current_question: -1
    };

    let players: UserObj[] = [];

    let game: GameObj = {
      info,
      question_set,
      players
    };

    let gameServer: GameServer = new GameServer(game);

    gameServers.push(gameServer);

    return gameServer;
  };

  const getValidJoinCode = () => {
    let join_code = generateJoinCode();
    while (!!getGameByCode(join_code)) join_code = generateJoinCode();
    return join_code;
  };

  const generateJoinCode = () => Math.floor(Math.random() * 100000000);
}

export = GameManager;
