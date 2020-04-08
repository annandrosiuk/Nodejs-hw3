const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    created_by: { type: Types.ObjectId, ref: 'User' },
    logs: [{
        message: { type: String, default: 'Truck created' },
        time: { type: Date, default: Date.now() }
    }],
    assigned_to: { type: Types.ObjectId, ref: 'User', default: null },
    status: { type: String, default: 'IS' },
    type: String,
    truckName: String,
    brand: String,
    model: String
});

module.exports = model('Truck', schema);