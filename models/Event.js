const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    appt_date: {
        type: String,
        required: false
    },
    appt_time: {
        type: Number,
        required: false
    },
    google_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = Event = mongoose.model('event', EventSchema)
