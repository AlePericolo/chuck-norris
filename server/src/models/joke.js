const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
    icon_url: {
        type: String
    },
    url: {
        type: String
    },
    value: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    categories: {
        type: [String]
    }
});

module.exports = mongoose.model("Joke", jokeSchema);