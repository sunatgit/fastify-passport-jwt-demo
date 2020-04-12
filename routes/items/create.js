var models = require('../../models');
var ItemSchema = require('../../schemas/item');

module.exports = {
    method: 'POST',
    url: '/items',
    schema: {
        body: ItemSchema,
        response: {
            200: ItemSchema
        }
    },
    handler: async function (request, reply) {
        delete request.body['id'];
        result = await models.Item.create(request.body);
        reply.send(result);
    }
};