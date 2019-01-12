import mongoose from "mongoose";

import { GameObj } from "./objects/game.objects";

import GameSchema from "./schemas/game.schemas";

interface GameModel extends GameObj, mongoose.Document {}

const Game = mongoose.model<GameModel>("Game", GameSchema);

export = Game;
