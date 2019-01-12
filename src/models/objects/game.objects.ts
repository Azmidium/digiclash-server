import { QuestionSetObj, OptionObj } from "./question_set.objects";
import GameState from "../enums/game_state.enums";

interface GameObj {
  info: GameInfoObj;
  players: UserObj[];
  question_set: QuestionSetObj;
}

interface GameInfoObj {
  join_code: number;
  player_count: number;
  game_state: GameState;
  current_question: number;
}

interface UserObj {
  id: number;
  display_name: string;

  total_score: number;
  answered: boolean;
  last_question_points: number;

  leaderboard_position: number;

  point_history: PointRecordObj[];
}

interface PointRecordObj {
  question_number: number;
  points_earned: number;

  option: OptionObj;
}

export { GameObj, GameInfoObj, UserObj, PointRecordObj };
