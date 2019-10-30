const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    appt_date: {
        type: String,
        required: true
    },
    appt_time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = Item = mongoose.model('item', ItemSchema)

