import {
  StrategyOptions,
  VerifyFunction,
  Strategy
} from "passport-google-oauth2";
import { Profile } from "passport-facebook";

import { AuthManager } from "../auth.controllers";

const options: StrategyOptions = {
  clientID:
    "432332892568-c1g80sc0l90qjte8or8l5ij6haodr0l2.apps.googleusercontent.com",
  clientSecret: "TtXMGg2DWhj-mlWcRiMfWRhw",
  callbackURL: "http://localhost:3000/auth/google/callback",
  scope: [
    // "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ]
};

const verify: VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: any, user?: any) => void
) => AuthManager.findOrCreateUser(profile, done);

const GoogleStrategy = new Strategy(options, verify);

export { GoogleStrategy };
