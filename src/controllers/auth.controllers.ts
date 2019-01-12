import passport from "passport";

import { LogManager } from "./logger.controllers";

import { FacebookStrategy } from "./strategies/facebook.strategies";
import { GoogleStrategy } from "./strategies/google.strategies";

import Account from "../models/account.models";

import Plans from "../models/enums/plans.enums";

import { AccountObj } from "../models/objects/account.objects";

export namespace AuthManager {
  export const initialize = () => {
    serialization();

    passport.use(FacebookStrategy);
    passport.use(GoogleStrategy);
  };

  export const findOrCreateUser = (profile, done) => {
    Account.findOne({ oauthID: profile.id }, (err, acc) => {
      if (err) return LogManager.throwAuthError(err, done);

      if (!!acc) return login(acc, done);

      createAccount(profile)
        .then(acc => {
          LogManager.info(`Account ${acc.id} has been created`);
          login(acc, done);
        })
        .catch(err => LogManager.throwAuthError(err, done));
    });
  };

  export const protectAuthRoute = (req, res, next) => {
    if (req.isAuthenticated()) return next();

    LogManager.infoWithResponse(
      "You must be logged in to access this route",
      res
    );
  };

  export const protectAnonRoute = (req, res, next) => {
    if (!req.isAuthenticated()) return next();

    LogManager.infoWithResponse(
      "You must NOT be logged in to access this route",
      res
    );
  };

  const serialization = () => {
    passport.serializeUser((user: any, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      Account.findOne({ _id: user["_id"] })
        .then(acc => done(null, acc))
        .catch(err => {
          LogManager.throwAuthError(err, done);
          done(null, user["_id"]);
        });
    });
  };

  const createAccount = profile => {
    const { id, displayName, emails } = profile;

    let accountObj: AccountObj = {
      oauthID: id,
      display_name: displayName,
      emails: emails,
      question_sets: [],
      plans: [Plans.FREE]
    };

    let account = new Account(accountObj);

    return account.save();
  };

  const login = (acc, done) => {
    LogManager.info(`User ${acc.id} has logged in`);
    done(null, acc);
  };
}
