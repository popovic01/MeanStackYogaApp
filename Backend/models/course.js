const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
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
    imageUrl: {
        type: String
        // required: true
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
