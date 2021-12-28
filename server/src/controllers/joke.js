const boom = require('boom')
const Joke = require('../models/joke')

exports.getJokes = async (req, reply) => {
    try {
        const jokes = await Joke.find()
        reply.status(200).send(jokes)
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getJoke = async (req, reply) => {
    try {
        const joke = await Joke.findById(req.params._id)
        reply.status(200).send(joke)
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.deleteJoke = async (req, reply) => {
    try {
        await Joke.remove({ _id: req.params._id })
        reply.status(200).send({ message: 'joke deleted' })
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.createJoke = async (req, reply) => {
    try {
        await Joke.create(req.body)
        reply.status(201).send({ message: 'joke created' })
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.updateJoke = async (req, reply) => {
    try {
        let { ...updateData } = req.body
        updateData.updated_at = new Date()
        await Joke.findByIdAndUpdate(req.params._id, updateData, {new: true})
        reply.status(200).send({ message: 'joke updated' })
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.searchJoke = async (req, reply) => {
    try {
        const jokes = await Joke.find({'value': new RegExp(req.params.query, 'i')})
        if (jokes.length === 0)
            reply.status(404).send({ message: 'Jokes not found' })
        else
            reply.status(200).send({
                total_items: jokes.length,
                items: jokes
            })
    } catch (err) {
        throw boom.boomify(err)
    }
}