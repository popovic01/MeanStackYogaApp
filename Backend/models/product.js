const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { 
        type: String,
        trim: true,
        required: true,
        maxlength: 40
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0
    },
    stock: { 
        type: Number, 
        default: 1 
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
      }],
    isDeleted: Boolean
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
