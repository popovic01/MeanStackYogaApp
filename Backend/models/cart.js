const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//cela korpa, tj. svi proizvodi u korpi
const CartSchema = new Schema({
    items: { 
        type: [],
        required: true          
    },
    subTotal: {
        default: 0,
        type: Number
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    postalCode: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('cart', CartSchema);