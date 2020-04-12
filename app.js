// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const AutoLoad = require('fastify-autoload');
var path = require('path');

require('dotenv').config()
fastify.register(require('fastify-jwt'), {
    secret: process.env.JWT_SECRET,
    sign: {
        expiresIn: '120s'
    }
});

fastify.register(require('./authenticate'));
var models = require('./models');

// Register routes
fastify.register(require('./routes/login'));
fastify.register((instance, opts, done) => {
    // Authenticated routes.
    instance.addHook('preHandler', instance.authenticate);

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, './routes/items'),
        options: {}
    });

    done();
});

models.sequelize.sync().then(function () {
    // Run the server!
    fastify.listen(3000, (err) => {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    })
});