const Cart = require("../models/cart");

exports.getAllCarts = (req, res, next) => {
const cartQuery = Cart.find();
let fetchedCarts;

cartQuery
.then(documents => {
  fetchedCarts = documents;
  res.status(200).json({
    message: "Carts fetched successfully!",
    carts: fetchedCarts
  });
})
.catch(error => {
  res.status(500).json({
    message: "Neuspešno dobavljanje porudžbina iz baze podataka"
  });
});
};

exports.orderDetails = (req, res, next) => {
  const cart = new Cart({
    items: req.body.items, 
    subTotal: req.body.subTotal,
    name: req.body.name, 
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
    phone: req.body.phone
  });
  cart.save()
  .then(result => {
    res.status(201).json({
      message: "Cart created!",
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Unet email je već registrovan"
    });
  });
};
