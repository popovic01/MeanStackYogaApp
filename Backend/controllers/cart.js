const Cart = require("../models/cart");
const User = require("../models/user");

exports.getAllCarts = (req, res, next) => {
const cartQuery = Cart.find();
let fetchedCarts;

cartQuery
.then(documents => {
  fetchedCarts = documents;
  res.status(200).json({
    message: "Orders fetched successfully!",
    carts: fetchedCarts
  });
})
.catch(error => {
  res.status(500).json({
    message: "Neuspešno dobavljanje porudžbina iz baze podataka"
  });
});
};

exports.getAllCartsFromOneUser = (req, res, next) => {
  let fetchedOrders;
  let userName = req.body.body;

  User.findOne({ email: userName })
    .then(user => {
      Cart.find({ username: user.email })
        .then(orders => {
          fetchedOrders = orders;
          res.status(200).json({
            message: "Orders fetched successfully!",
            orders: fetchedOrders
          });
        })
    })
    .catch(error => {
      console.log(error);
    })
};

exports.orderDetails = (req, res, next) => {
  const cart = new Cart({
    items: req.body.items, 
    subTotal: req.body.subTotal,
    name: req.body.name, 
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
    phone: req.body.phone,
    username: req.body.username
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
      message: "Neuspešno!"
    });
  });
};
