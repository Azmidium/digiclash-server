// Imports
import http from "http";
import path from "path";

import express from "express";
import session from "express-session";
import bodyParser from "body-parser";

import mongoose from "mongoose";

import passport from "passport";

import { AuthManager } from "./controllers/auth.controllers";

import { LogManager } from "./controllers/logger.controllers";
import isMobile from "./controllers/mobile.controllers";

import socketIo from "socket.io";

// Route Imports
import apiRouter from "./routes/api.routes";
import authRouter from "./routes/auth.routes";
import { stringify } from "querystring";

// Express Init
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// Mongoose Init
const dbName = "digiclash";
const dbUrl = `mongodb://localhost:27017/${dbName}`;

mongoose.Promise = global.Promise;
mongoose.connect(
  dbUrl,
  { useNewUrlParser: true }
);

// Body Parser Init
app.use(bodyParser.json());

// Auth Init
app.use(
  session({ secret: "digiclash", resave: false, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());
AuthManager.initialize();

// Socket.io Server
const io = socketIo(server);

// Make Public
app.use(express.static(path.join(__dirname, "client")));

// ---------------------------------------------------------------------------------------------- //

// Server Started

server.listen(Number(port), "0.0.0.0", () => {
  LogManager.info(`Server started on port *.${port}`);
});

// Init Routes
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// Angular Routing
app.use("*", (req, res, next) =>
  res.sendFile(path.join(__dirname, "client/index.html"))
);

// Log Connection Data
/*
io.on("connection", socket => {
  let ip = socket.request.connection.remoteAddress;
  let ua = socket.request.headers["user-agent"];

  LogManager.info(
    `A user connected from ${ip} using a ${
      isMobile(ua) ? "mobile device" : "desktop PC"
    }`
  );

  socket.on("disconnect", () => LogManager.info("A user disconnected"));
});
*/

// Designate room to new player
io.of("/api/game").on("connection", socket => {
  socket.on("join-host", room => socket.join(room).join("host"));
  socket.on("join-game", room => socket.join(room));
  socket.on("join-user", (room_data: { code: string; user_id: string }) =>
    socket.join(room_data.code).join(room_data.user_id)
  );

  socket.on("disconnect", () => socket.leaveAll());
});

export { io };
