"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth2_1 = require("passport-google-oauth2");
const auth_controllers_1 = require("../auth.controllers");
const options = {
    clientID: "432332892568-c1g80sc0l90qjte8or8l5ij6haodr0l2.apps.googleusercontent.com",
    clientSecret: "TtXMGg2DWhj-mlWcRiMfWRhw",
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: [
        // "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]
};
const verify = (accessToken, refreshToken, profile, done) => auth_controllers_1.AuthManager.findOrCreateUser(profile, done);
const GoogleStrategy = new passport_google_oauth2_1.Strategy(options, verify);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategies.js.map