const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({
    filledBottleGiven: {
        type: Number,
        required: true
    },
    emptyBottleTaken: {
        type: Number,
        required: true
    },
    remainingBottle: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    bottleType: {
        type: String,
        enum: ['Normal', 'MotherDairy'],
        default: 'Normal',
        required: true
    },
    perBottleCost: {
        type: Number,
        required: true
    },
    isPaid: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        default: 'Paid',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Entry', EntrySchema);