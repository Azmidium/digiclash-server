"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const logger_controllers_1 = require("../controllers/logger.controllers");
const auth_controllers_1 = require("../controllers/auth.controllers");
const facebook_routes_1 = __importDefault(require("./auth/facebook.routes"));
const google_routes_1 = __importDefault(require("./auth/google.routes"));
const router = express_1.default.Router();
router.get("/logout", auth_controllers_1.AuthManager.protectAuthRoute, (req, res, next) => {
    req.session.destroy(err => {
        if (err)
            return logger_controllers_1.LogManager.errorWithResponse(err, res);
        logger_controllers_1.LogManager.infoWithResponse(`User ${req.user._id} has logged out`, res);
    });
});
router.get("/user", (req, res, next) => res.send({ user: req.user }));
router.use(auth_controllers_1.AuthManager.protectAnonRoute, facebook_routes_1.default);
router.use(auth_controllers_1.AuthManager.protectAnonRoute, google_routes_1.default);
module.exports = router;
//# sourceMappingURL=auth.routes.js.map