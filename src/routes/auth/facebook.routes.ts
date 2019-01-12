import express from "express";
import passport = require("passport");

const router = express.Router();

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => res.send("<script>window.close()</script>")
);

export = router;
