const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        default: 1
    },
    imagePath: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
