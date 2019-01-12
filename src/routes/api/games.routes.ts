import express from "express";

import { LogManager } from "../../controllers/logger.controllers";

import GameManager from "../../controllers/game.controllers";

import { GameObj } from "../../models/objects/game.objects";

const router = express.Router();

router.get("/list", (req, res, next) => {
  LogManager.info("Request recieved for list of games");

  let games: GameObj[] = GameManager.getGameServers().map(server =>
    server.getGame()
  );

  res.send({ games });
});

router.get("/code/:code", (req, res, next) => {
  let code: number = Number(req.params["code"]);
  let game: GameObj = GameManager.getGameByCode(code);

  LogManager.info(`Request for game with join code ${code} recieved`);

  res.send({ game });
});

router.use(LogManager.getErrorRouter());

export = router;
