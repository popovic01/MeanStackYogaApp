const Cart = require("../models/cart");

exports.addUpdateCart = (req, res, next) => {
    console.log(req.body);
    const cart = new Cart({
      items: req.body.items,
      user: req.body.userId,
      subTotal: req.body.total
    });
    cart.save().then(() => {
      res.status(201).json({
        message: 'Cart added successfully'
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Neuspešno"
      });
    });
  };
