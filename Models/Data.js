const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config= {
    value:{
        type: Number,
        default: 0,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    },
    device:{
        type: mongoose.Schema.ObjectId,
        ref: 'Device',
        required: true
    }
};

const DataSchema = new Schema(config);

module.exports = mongoose.model('Data', DataSchema);
