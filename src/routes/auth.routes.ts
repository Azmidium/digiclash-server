import express from "express";

import { LogManager } from "../controllers/logger.controllers";

import { AuthManager } from "../controllers/auth.controllers";

import facebookRoutes from "./auth/facebook.routes";
import googleRoutes from "./auth/google.routes";

const router = express.Router();

router.get("/logout", AuthManager.protectAuthRoute, (req, res, next) => {
  req.session.destroy(err => {
    if (err) return LogManager.errorWithResponse(err, res);
    LogManager.infoWithResponse(`User ${req.user._id} has logged out`, res);
  });
});

router.get("/user", (req, res, next) => res.send({ user: req.user }));

router.use(AuthManager.protectAnonRoute, facebookRoutes);
router.use(AuthManager.protectAnonRoute, googleRoutes);

export = router;
