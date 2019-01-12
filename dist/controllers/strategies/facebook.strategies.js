"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_facebook_1 = require("passport-facebook");
const auth_controllers_1 = require("../auth.controllers");
const options = {
    clientID: "209627013317202",
    clientSecret: "c24ff7f522eca7f7485acea161a4e66c",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
};
const verify = (accessToken, refreshToken, profile, done) => auth_controllers_1.AuthManager.findOrCreateUser(profile, done);
const FacebookStrategy = new passport_facebook_1.Strategy(options, verify);
exports.FacebookStrategy = FacebookStrategy;
//# sourceMappingURL=facebook.strategies.js.map