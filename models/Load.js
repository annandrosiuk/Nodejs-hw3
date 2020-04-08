const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    created_by: { type: Types.ObjectId, ref: 'User' },
    logs: [{
        message: { type: String, default: 'Load created' },
        time: { type: Date, default: Date.now() }
    }],
    assigned_to: { type: Types.ObjectId, ref: 'User', default: null },
    status: { type: String, default: 'NEW' },
    state: { type: String, default: null },
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    payload: Number
});

module.exports = model('Load', schema);