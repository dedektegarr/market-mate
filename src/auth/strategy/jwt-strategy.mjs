import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../../models/Users.mjs";
import Account from "../../models/Account.mjs";
import { configDotenv } from "dotenv";

configDotenv();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new Strategy(options, async (jwt_payload, done) => {
  try {
    const account = await Account.findOne({ _id: jwt_payload.id });
    if (!account) throw new Error("Invalid credentials");

    const user = await User.findOne({ accountId: account._id });
    if (!user) throw new Error("User not found");

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
});

export default strategy;
