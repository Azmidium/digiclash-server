"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const logger_controllers_1 = require("./logger.controllers");
const facebook_strategies_1 = require("./strategies/facebook.strategies");
const google_strategies_1 = require("./strategies/google.strategies");
const account_models_1 = __importDefault(require("../models/account.models"));
const plans_enums_1 = __importDefault(require("../models/enums/plans.enums"));
var AuthManager;
(function (AuthManager) {
    AuthManager.initialize = () => {
        serialization();
        passport_1.default.use(facebook_strategies_1.FacebookStrategy);
        passport_1.default.use(google_strategies_1.GoogleStrategy);
    };
    AuthManager.findOrCreateUser = (profile, done) => {
        account_models_1.default.findOne({ oauthID: profile.id }, (err, acc) => {
            if (err)
                return logger_controllers_1.LogManager.throwAuthError(err, done);
            if (!!acc)
                return login(acc, done);
            createAccount(profile)
                .then(acc => {
                logger_controllers_1.LogManager.info(`Account ${acc.id} has been created`);
                login(acc, done);
            })
                .catch(err => logger_controllers_1.LogManager.throwAuthError(err, done));
        });
    };
    AuthManager.protectAuthRoute = (req, res, next) => {
        if (req.isAuthenticated())
            return next();
        logger_controllers_1.LogManager.infoWithResponse("You must be logged in to access this route", res);
    };
    AuthManager.protectAnonRoute = (req, res, next) => {
        if (!req.isAuthenticated())
            return next();
        logger_controllers_1.LogManager.infoWithResponse("You must NOT be logged in to access this route", res);
    };
    const serialization = () => {
        passport_1.default.serializeUser((user, done) => {
            done(null, user);
        });
        passport_1.default.deserializeUser((user, done) => {
            account_models_1.default.findOne({ _id: user["_id"] })
                .then(acc => done(null, acc))
                .catch(err => {
                logger_controllers_1.LogManager.throwAuthError(err, done);
                done(null, user["_id"]);
            });
        });
    };
    const createAccount = profile => {
        const { id, displayName, emails } = profile;
        let accountObj = {
            oauthID: id,
            display_name: displayName,
            emails: emails,
            question_sets: [],
            plans: [plans_enums_1.default.FREE]
        };
        let account = new account_models_1.default(accountObj);
        return account.save();
    };
    const login = (acc, done) => {
        logger_controllers_1.LogManager.info(`User ${acc.id} has logged in`);
        done(null, acc);
    };
})(AuthManager = exports.AuthManager || (exports.AuthManager = {}));
//# sourceMappingURL=auth.controllers.js.map