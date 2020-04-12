module.exports = function (fastify, opts, done) {
  fastify.route({
    method: 'GET',
    url: '/login',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          }
        }
      }
    },
    preValidation: [fastify.fbauthenticate],
    handler: async function (request, reply) {
      // take the user object from authenticated request 
      // return jwt signatute for it
      var payload = request['user']
      const token = fastify.jwt.sign({ payload })
      reply.send({ token })
    }
  });

  done();
}