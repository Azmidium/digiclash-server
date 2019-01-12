import {
  StrategyOption,
  Profile,
  VerifyFunction,
  Strategy
} from "passport-facebook";

import { AuthManager } from "../auth.controllers";

const options: StrategyOption = {
  clientID: "209627013317202",
  clientSecret: "c24ff7f522eca7f7485acea161a4e66c",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
};

const verify: VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: any, user?: any, info?: any) => void
) => AuthManager.findOrCreateUser(profile, done);

const FacebookStrategy = new Strategy(options, verify);

export { FacebookStrategy };
