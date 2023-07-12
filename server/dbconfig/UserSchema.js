const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const activitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    activityType: {
        type: String,
        enum: ['Run', 'Bicycle Ride', 'Swim', 'Walk', 'Hike'],
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const Activity = mongoose.model('Activity', activitySchema);
const User = mongoose.model('user', userSchema);
module.exports = { User, Activity };