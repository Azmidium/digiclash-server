import express from "express";

import gameRouter from "./api/game.routes";
import gamesRouter from "./api/games.routes";
import questionSetsRouter from "./api/question_sets.routes";
import userRouter from "./api/user.routes";

const router = express.Router();

router.use("/game", gameRouter);
router.use("/games", gamesRouter);
router.use("/question_sets", questionSetsRouter);
router.use("/user", userRouter);

export = router;
