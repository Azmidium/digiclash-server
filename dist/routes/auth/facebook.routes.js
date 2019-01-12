"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const passport = require("passport");
const router = express_1.default.Router();
router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", passport.authenticate("facebook"), (req, res) => res.send("<script>window.close()</script>"));
module.exports = router;
//# sourceMappingURL=facebook.routes.js.map