var models = require('../../models');
var ItemSchema = require('../../schemas/item');

module.exports = {
    method: 'GET',
    url: '/items',
    schema: {
        response: {
            200: {
                type: 'array',
                items: ItemSchema
            }
        }
    },
    handler: async function (request, reply) {
        result = await models.Item.findAll();
        reply.send(result);
    }
};