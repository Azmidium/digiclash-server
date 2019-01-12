import express from "express";
import passport = require("passport");

const router = express.Router();

router.get("/google", passport.authenticate("google"));
router.get("/google/callback", passport.authenticate("google"), (req, res) =>
  res.send("<script>window.close()</script>")
);

export = router;
