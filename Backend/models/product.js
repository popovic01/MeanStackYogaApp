const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { 
        type: String,
        trim: true,
        required: true,
        maxlength: 40
    },
    description: { 
        type: String,
        required: true
    },
    colors: { 
        type: []
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0
    },
    category: { 
        type: String, 
        required: true
    },
    stock: { 
        type: Number, 
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    imagePath: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'product'
    }
/*     category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
      }],
    isDeleted: Boolean */
}, { timestamps: true });

/* productSchema.pre('validate', function (next) {
    //check if there is a description
    if (this.description) {
      this.description = htmlPurify.sanitize(this.description);
      this.snippet = stripHtml(this.description.substring(0, 200)).result;
    }
  
    next();
  }); */

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
