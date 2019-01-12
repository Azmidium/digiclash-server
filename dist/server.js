"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const auth_controllers_1 = require("./controllers/auth.controllers");
const logger_controllers_1 = require("./controllers/logger.controllers");
const socket_io_1 = __importDefault(require("socket.io"));
// Route Imports
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// Express Init
const port = process.env.PORT || 3000;
const app = express_1.default();
const server = http_1.default.createServer(app);
// Mongoose Init
const dbName = "digiclash";
const dbUrl = `mongodb://localhost:27017/${dbName}`;
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(dbUrl, { useNewUrlParser: true });
// Body Parser Init
app.use(body_parser_1.default.json());
// Auth Init
app.use(express_session_1.default({ secret: "digiclash", resave: false, saveUninitialized: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
auth_controllers_1.AuthManager.initialize();
// Socket.io Server
const io = socket_io_1.default(server);
exports.io = io;
// Make Public
app.use(express_1.default.static(path_1.default.join(__dirname, "client")));
// ---------------------------------------------------------------------------------------------- //
// Server Started
server.listen(Number(port), "0.0.0.0", () => {
    logger_controllers_1.LogManager.info(`Server started on port *.${port}`);
});
// Init Routes
app.use("/api", api_routes_1.default);
app.use("/auth", auth_routes_1.default);
// Angular Routing
app.use("*", (req, res, next) => res.sendFile(path_1.default.join(__dirname, "client/index.html")));
//# sourceMappingURL=server.js.map