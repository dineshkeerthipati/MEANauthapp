const jwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt,
    User = require('../models/user'),
    config = require('../config/database');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        User.getUserById(jwt_payload._id, (err, user) => {
            if(err) {
                return done(err, false);
            }
            if(user) {
                return done(null, true);
            } else {
                return done(null, false);
        }
    });
    }));
}