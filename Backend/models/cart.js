const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//cela korpa, tj. svi proizvodi u korpi
const CartSchema = new Schema({
    items: [],
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' },
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('cart', CartSchema);