import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  join_code: Number,
  player_count: Number,
  game_state: String
});

export = GameSchema;
