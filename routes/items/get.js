var models = require('../../models');
var ItemSchema = require('../../schemas/item');

module.exports = {
    method: 'GET',
    url: '/items/:id',
    schema: {
        response: {
            200: ItemSchema
        }
    },
    handler: async function (request, reply) {
        result = await models.Item.findByPk(request.params['id']);

        if (result == null) {
            reply.code(404).send();
        }
        else {
            reply.send(result);
        }
    }
};