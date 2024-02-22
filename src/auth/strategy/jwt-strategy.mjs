import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import Account from '../../models/Account.mjs'

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

const strategy = new Strategy(options, async (jwt_payload, done) => {
    try {
        const findAccount = await Account.findOne({id: jwt_payload.sub});

        if(!findAccount) throw new Error('Invalid credentials');
        
        return done(null, findAccount);
    } catch (error) {
        return done(error, null)
    }
});

export default strategy