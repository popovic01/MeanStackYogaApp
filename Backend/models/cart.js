const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//cela korpa, tj. svi proizvodi u korpi
const CartSchema = new Schema({
    items: [],
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' },
    subTotal: {
        default: 0,
        type: Number
    },
    name: { type: String, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    phone: { type: String, required: false },
    postalCode: { type: String, required: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('cart', CartSchema);