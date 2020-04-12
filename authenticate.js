const fp = require('fastify-plugin')
const models = require('./models')
var passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

function getUser(user) {
    return {
        email: user.emails[0].value,
        name: user.displayName,
        id: user.id
    };
}

module.exports = fp(async function (fastify, opts) {
    passport.use(new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }, function (accessToken, refreshToken, profile, done) {
        // Create user on first time login/signup
        models.User.findOrCreate({
            where: { id: profile.id },
            defaults: getUser(profile)
        }).then((result) => {
            done(null, profile);
        }).catch((reason) => {
            done(null, false);
        });
    }));

    fastify.use(passport.initialize()) // Used to initialize passport

    // This will be used for login/signup methods, where we verify the 
    // token from facebook and exchange it for jwt tokens.
    fastify.decorate("fbauthenticate", function (request, reply, done) {
        try {
            passport.authenticate(
                'facebook-token',
                { session: false },
                function (err, user, info) {
                    if (err || !user) {
                        reply.code(401).send(new Error('User Not Authenticated'));
                        done(err);
                        return;
                    }

                    request.user = getUser(user);

                    return done(null);
                })(request, reply, done)
        } catch (err) {
            reply.send(err)
        }
    })

    // Use jwt to authenticate user request and populate user context
    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
})