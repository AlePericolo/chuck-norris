const S = require('fluent-json-schema')
const joke = require('../../../controllers/joke')

const jokeRoutes = (fastify, options, done) => {

    fastify.get('/jokes', {
        schema: {
            description: 'get jokes',
            tags: ['Joke'],
            summary: 'get jokes',
            response: {
                200: S.array().items(
                    S.object()
                        .prop('_id', S.string())
                        .prop('icon_url', S.string())
                        .prop('url', S.string())
                        .prop('value', S.string())
                        .prop('created_at', S.string().format('time'))
                        .prop('updated_at', S.string().format('time'))
                        .prop('categories', S.array().items(S.string()))
                )
            },
        },
        handler: joke.getJokes
    })

    fastify.get('/jokes/:_id', {
        schema: {
            description: 'get joke by id',
            tags: ['Joke'],
            summary: 'get joke by id',
            params: S.object()
                .prop('_id', S.string().required()),
            response: {
                200: S.object()
                    .prop('_id', S.string())
                    .prop('icon_url', S.string())
                    .prop('url', S.string())
                    .prop('value', S.string())
                    .prop('created_at', S.string().format('time'))
                    .prop('updated_at', S.string().format('time'))
                    .prop('categories', S.array().items(S.string()))
            },
        },
        handler: joke.getJoke
    })

    fastify.delete('/jokes/:_id', {
        schema: {
            description: 'delete joke',
            tags: ['Joke'],
            summary: 'delete joke',
            params: S.object()
                .prop('_id', S.string().required()),
            response: {
                200: S.object()
                    .prop('message', S.string())
            },
        },
        handler: joke.deleteJoke
    })

    fastify.post('/joke', {
        schema: {
            description: 'create new joke',
            tags: ['Joke'],
            summary: 'create new joke',
            body: S.object()
                .prop('icon_url', S.string())
                .prop('url', S.string())
                .prop('value', S.string())
                .prop('categories', S.array().items(S.string())),
            response: {
                201: S.object()
                    .prop('message', S.string())
            }
        },
        handler: joke.createJoke
    })

    fastify.put('/joke/:_id', {
        schema: {
            description: 'update joke by id',
            tags: ['Joke'],
            summary: 'update joke by id',
            params: S.object()
                .prop('_id', S.string().required()),
            body: S.object()
                .prop('icon_url', S.string())
                .prop('url', S.string())
                .prop('value', S.string())
                .prop('categories', S.array().items(S.string())),
            response: {
                200: S.object()
                    .prop('message', S.string())
            }
        },
        handler: joke.updateJoke
    })

    fastify.get('/jokes/search/:query', {
        schema: {
            description: 'search jokes by query',
            tags: ['Joke'],
            summary: 'search jokes by query',
            params: S.object()
                .prop('query', S.string().minLength(3).required()),
            response: {
                200: S.object()
                    .prop('total_items', S.number())
                    .prop('items', S.array().items(
                        S.object()
                        .prop('_id', S.string())
                        .prop('icon_url', S.string())
                        .prop('url', S.string())
                        .prop('value', S.string())
                        .prop('created_at', S.string().format('time'))
                        .prop('updated_at', S.string().format('time'))
                        .prop('categories', S.array().items(S.string()))
                    )),
                404: S.object()
                    .prop('message', S.string())
            },
        },
        handler: joke.searchJoke
    })

    done()
}

module.exports = jokeRoutes