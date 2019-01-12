"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const passport = require("passport");
const router = express_1.default.Router();
router.get("/google", passport.authenticate("google"));
router.get("/google/callback", passport.authenticate("google"), (req, res) => res.send("<script>window.close()</script>"));
module.exports = router;
//# sourceMappingURL=google.routes.js.map