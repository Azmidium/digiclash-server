"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const game_state_enums_1 = __importDefault(require("../models/enums/game_state.enums"));
const logger_controllers_1 = require("./logger.controllers");
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
class GameServer {
    constructor(game) {
        // Game Loop
        this.startGameInteration = () => {
            this.log("Starting game interation...");
            this.updateState(game_state_enums_1.default.TRANSITION);
            this.startTransition();
        };
        this.startTransition = () => {
            this.log("Starting transition...");
            this.resetUsers();
            setTimeout(() => this.startQuestion(), this.getSet().transition_time * 1000);
        };
        this.startQuestion = () => {
            this.incrementQuestion();
            this.question_start_time = Date.now();
            this.log(`Show question #${this.getInfo().current_question + 1}...`);
            this.startCountdown(this.getCurrentQuestion().answer_time, this.startShowAnswer(), this.checkAllUsersAnswered());
        };
        this.startShowAnswer = () => {
            this.log(`Showing answers to question #${this.getInfo().current_question + 1}`);
            this.updateState(game_state_enums_1.default.SHOW_ANSWER);
            setTimeout(() => this.startLeaderboard(), 5000);
        };
        this.startLeaderboard = () => {
            this.log(`Showing leaderboard`);
            this.updateState(game_state_enums_1.default.LEADERBOARD);
            this.startCountdown(this.getSet().leaderboard_time, () => {
                if (!!this.getNextQuestion())
                    return server_1.io.to(this.getJoinCode()).emit("end");
                this.startTransition();
            });
        };
        this.incrementQuestion = () => {
            this.getInfo().current_question += 1;
            this.updateGame();
        };
        // Events
        this.handleAnswer = (user_id, option) => {
            let user = this.getUserByID(user_id);
            let score = this.calculateScore(option.correct);
            let record = {
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
        // Update emitters
        this.updateGame = () => server_1.io.to(this.getJoinCode()).emit("game", this.getInfo());
        this.updateUser = (user) => server_1.io
            .to(this.getJoinCode())
            .to(user.id.toString())
            .emit("user", user);
        this.updateState = (state) => {
            this.getInfo().game_state = state;
            this.updateGame();
        };
        this.addPlayerToGame = (user) => {
            this.log(`${user.display_name} has joined the game`);
            this.getPlayers().push(user);
        };
        // Public Getters
        this.getGame = () => this.game;
        this.getInfo = () => this.getGame().info;
        this.getPlayers = () => this.getGame().players;
        this.getSet = () => this.getGame().question_set;
        // Private Getters
        this.getJoinCode = () => this.game.info.join_code.toString();
        this.getCurrentQuestion = () => {
            let i = this.getInfo().current_question;
            return this.getSet().questions[i];
        };
        this.getNextQuestion = () => {
            let i = this.getInfo().current_question + 1;
            return this.getSet().questions[i];
        };
        this.getUserByID = (user_id) => this.getPlayers().filter(user => user.id === user_id)[0];
        this.getNumPlayers = () => this.getPlayers().length;
        this.getNumAnswered = () => this.getPlayers().filter(user => user.answered).length;
        this.checkAllUsersAnswered = () => this.getNumPlayers() === this.getNumAnswered();
        // Methods
        this.createUser = (display_name) => {
            let user = {
                id: this.getNewUserID(),
                display_name,
                total_score: 0,
                answered: false,
                last_question_points: 0,
                leaderboard_position: 0,
                point_history: []
            };
            this.addPlayerToGame(user);
            return user;
        };
        this.getNewUserID = () => this.getNumPlayers() + 1;
        this.calculateScore = (correct) => {
            if (!correct)
                return 0;
            let answered_time = Date.now() - this.question_start_time; // in milliseconds
            let delayed_deduction = answered_time / (this.getCurrentQuestion().answer_time * 1000);
            let point_deduction = Math.round(500 * delayed_deduction);
            let score = 1000 - point_deduction;
            return score;
        };
        this.startCountdown = (seconds, callback, stop) => {
            this.emitCountdown(seconds);
            let countdown = setInterval(x => {
                if (!!stop && stop) {
                    callback();
                    return clearInterval(countdown);
                }
                let iteration = x + 1;
                this.emitCountdown(seconds - iteration);
                if (seconds >= iteration) {
                    callback();
                    return clearInterval(countdown);
                }
            }, 1000);
            return countdown;
        };
        this.emitCountdown = (number) => {
            this.log(number.toString());
            server_1.io.to(this.getJoinCode()).emit("countdown", number);
        };
        this.log = (message) => logger_controllers_1.LogManager.info(this.getJoinCode() + " " + message);
        this.resetUsers = () => {
            for (let user of this.getPlayers()) {
                user.answered = false;
                this.updateUser(user);
            }
        };
        this.game = game;
        server_1.io.to(this.getJoinCode()).on("connection", (socket) => {
            socket.on("start", () => this.startGameInteration());
            socket.on("answer", (user_id, option) => this.handleAnswer(user_id, option));
            socket.on("disconnect", socket => { });
        });
    }
}
exports.GameServer = GameServer;
//# sourceMappingURL=game_server.controllers.js.map