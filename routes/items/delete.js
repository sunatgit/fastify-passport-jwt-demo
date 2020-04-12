var models = require('../../models');
var ItemSchema = require('../../schemas/item');

module.exports = {
    method: 'DELETE',
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
            result.destroy();
            reply.send();
        }
    }
};