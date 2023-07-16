const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model('Customer', CustomerSchema);