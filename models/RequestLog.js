const { Schema, model } = require('mongoose');

const schema = new Schema({
    method: String,
    api_url: String,
    time: {type: Date, default: Date.now()}
});

module.exports = model('RequestLog', schema);