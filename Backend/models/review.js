const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating a Review Schema
const reviewSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  description: String,
  rating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
//Exporting the Review schema to reuse
module.exports = Review;