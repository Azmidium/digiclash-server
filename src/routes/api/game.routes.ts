import express from "express";

import { GameServer } from "./../../controllers/game_server.controllers";
import {
  UserObj,
  GameInfoObj,
  GameObj
} from "../../models/objects/game.objects";

import GameManager from "../../controllers/game.controllers";
import { LogManager } from "../../controllers/logger.controllers";
import { AuthManager } from "../../controllers/auth.controllers";
import { QuestionSetObj } from "../../models/objects/question_set.objects";

const router = express.Router();

// Join a game
router.use("/join/:code/:disp_name", (req, res, next) => {
  let code: number = Number(req.params["code"]);
  let display_name: string = req.params["disp_name"];

  let gameServer: GameServer = GameManager.getGameServerByCode(code);

  if (!!!gameServer)
    return LogManager.infoWithResponse(
      "Game with this join code doesn't exist",
      res
    );

  let user: UserObj = gameServer.createUser(display_name);

  let info: GameInfoObj = gameServer.getInfo();
  let set: QuestionSetObj = gameServer.getSet();

  res.send({ user, info, set });
});

// Create a game
router.post("/create", AuthManager.protectAuthRoute, (req, res, next) => {
  let game: GameObj = GameManager.createGame(
    req.body as QuestionSetObj
  ).getGame();

  LogManager.info(`Creating a game with join code ${game.info.join_code}`);

  res.send({ game });
});

export = router;
