// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const AutoLoad = require('fastify-autoload');
var path = require('path');

var models = require('./models');
fastify.register(AutoLoad, {
    dir: path.join(__dirname, './routes/items'),
    options: {}
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