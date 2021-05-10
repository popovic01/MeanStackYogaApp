const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 20,
      unique: true,
    },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;