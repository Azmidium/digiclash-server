import { UserObj, PointRecordObj } from "../models/objects/game.objects";
import { io } from "../server";
import { GameObj } from "../models/objects/game.objects";

import GameState from "../models/enums/game_state.enums";

import { OptionObj } from "../models/objects/question_set.objects";
import { LogManager } from "./logger.controllers";

/* 
Events Out:
- countdown
- game
- user (in join code room, on user id)
- end

Events In:
- connection
- start
- answer
- disconnect
*/

export class GameServer {
  game: GameObj;

  question_start_time: number;

  constructor(game: GameObj) {
    this.game = game;
    this.server();
  }

  server = () =>
    io
      .of("/api/game")
      .to(this.getJoinCode())
      .on("connection", (socket: SocketIO.Socket) =>
        this.registerEvents(socket)
      );

  // Game Loop
  startGameInteration = () => {
    this.log("Starting game interation...");
    this.startTransition();
  };

  startTransition = () => {
    this.log("Starting transition...");
    this.updateState(GameState.TRANSITION);

    this.resetUsers();
    setTimeout(
      () => this.startQuestion(),
      this.getSet().transition_time * 1000
    );
  };

  startQuestion = () => {
    this.incrementQuestion();
    this.question_start_time = Date.now();

    this.updateState(GameState.QUESTION);
    this.log(
      `Show question "${
        this.getCurrentQuestion().text
      }" to ${this.getNumPlayers() || 0} players`
    );

    this.startCountdown(
      this.getCurrentQuestion().answer_time,
      this.startShowAnswer,
      this.checkAllUsersAnswered
    );
  };

  startShowAnswer = () => {
    this.log(
      `Showing answers to question #${this.getInfo().current_question + 1}`
    );

    this.updateState(GameState.SHOW_ANSWER);
    setTimeout(() => this.startLeaderboard(), 5000);
  };

  startLeaderboard = () => {
    this.log(`Showing leaderboard`);

    this.updateState(GameState.LEADERBOARD);
    this.startCountdown(this.getSet().leaderboard_time, this.attemptFinish);
  };

  attemptFinish = () => {
    if (!!!this.getNextQuestion()) return this.updateState(GameState.FINISH);
    this.startTransition();
  };

  // Events
  private registerEvents = (socket: SocketIO.Socket) => {
    socket.on("start", () => this.startGameInteration());
    socket.on("answer", (user_id: number, option: OptionObj) =>
      this.handleAnswer(user_id, option)
    );
    socket.on("leave", (user_id: number) => this.removeUser(user_id));
    socket.to("host").on("end", () => this.handleEnd());
  };

  private handleAnswer = (user_id: number, option: OptionObj) => {
    let user = this.getUserByID(user_id);
    let score = this.calculateScore(option.correct);
    let record: PointRecordObj = {
      question_number: this.getInfo().current_question + 1,
      points_earned: score,
      option
    };

    user.answered = true;
    user.total_score += score;
    user.last_question_points = score;
    user.point_history.push(record);

    this.updateUser(user);
  };

  private handleEnd = () => {
    LogManager.info(`Ending game ${this.getJoinCode()}...`);

    io.of("/api/game")
      .in(this.getJoinCode())
      .clients((err, socketIds) => {
        if (err) return LogManager.error(err);

        socketIds.forEach(id =>
          io.of("/api/game").sockets[id].disconnect(true)
        );
      });
  };

  // Update emitters
  private updateGame = () =>
    io
      .of("/api/game")
      .to(this.getJoinCode())
      .to("host")
      .emit("game", this.getGame());

  private updateInfo = () =>
    io
      .of("/api/game")
      .to(this.getJoinCode())
      .emit("info", this.getInfo());

  private updateUser = (user: UserObj) =>
    io
      .of("/api/game")
      .to(this.getJoinCode())
      .to(user.id.toString())
      .emit("user", user);

  private updateState = (state: GameState) => {
    this.getInfo().game_state = state;

    this.updateInfo();
    this.updateGame();
  };

  private addPlayerToGame = (user: UserObj) => {
    this.log(`${user.display_name} has joined the game`);
    this.getPlayers().push(user);
  };

  // Public Getters
  getGame = () => this.game;

  getInfo = () => this.getGame().info;
  getPlayers = () => this.getGame().players;
  getSet = () => this.getGame().question_set;

  // Private Getters
  private getJoinCode = () => this.game.info.join_code.toString();

  private getCurrentQuestion = () => {
    let i: number = this.getInfo().current_question;
    return this.getSet().questions[i];
  };

  private getNextQuestion = () => {
    let i: number = this.getInfo().current_question + 1;
    return this.getSet().questions[i];
  };

  private getUserByID = (user_id: number) =>
    this.getPlayers().filter(user => user.id === user_id)[0];

  private getNumPlayers = () => this.getPlayers().length;

  private getNumAnswered = () =>
    this.getPlayers().filter(user => user.answered).length;

  private checkAllUsersAnswered = () =>
    this.getNumPlayers() === this.getNumAnswered();

  // Methods
  createUser = (display_name: string) => {
    let user: UserObj = {
      id: this.getNewUserID(),
      display_name,

      total_score: 0,
      answered: false,
      last_question_points: 0,

      leaderboard_position: 0,

      point_history: []
    };

    this.addPlayerToGame(user);

    this.updateGame();

    return user;
  };

  removeUser = (user_id: number) => {
    let i = this.getPlayers().findIndex(user => user.id === user_id);

    if (i !== -1) this.getPlayers().splice(i, 1);
  };

  incrementQuestion = () => {
    this.getInfo().current_question += 1;

    this.updateInfo();
    this.updateGame();
  };

  private getNewUserID = () => this.getNumPlayers() + 1;

  private calculateScore = (correct: boolean) => {
    if (!correct) return 0;

    let answered_time = Date.now() - this.question_start_time; // in milliseconds
    let delayed_deduction =
      answered_time / (this.getCurrentQuestion().answer_time * 1000);

    let point_deduction = Math.round(500 * delayed_deduction);

    let score = 1000 - point_deduction;

    return score;
  };

  private startCountdown = (seconds: number, callback, stop?) => {
    this.emitCountdown(seconds);

    let count = seconds;

    let countdown = setInterval(() => {
      count -= 1;

      if (!!stop && stop()) return this.exitCountdown(callback, countdown);

      this.emitCountdown(count);

      if (count <= 0) return this.exitCountdown(callback, countdown);
    }, 1000);

    return countdown;
  };

  private exitCountdown = (callback, countdown) => {
    callback();
    clearInterval(countdown);
  };

  private emitCountdown = (number: number) => {
    if (number % 5 === 0) this.log(number.toString());
    io.of("/api/game")
      .to(this.getJoinCode())
      .emit("countdown", number);
  };

  private log = (message: string) =>
    LogManager.info(this.getJoinCode() + " " + message);

  private resetUsers = () => {
    for (let user of this.getPlayers()) {
      user.answered = false;
      this.updateUser(user);
    }
  };
}
