const Cart = require("../models/cart");
const User = require("../models/user");

exports.addUpdateCart = (req, res, next) => {
    console.log(req.body);
    const cart = new Cart({
      items: req.body.items,
      userId: req.body.user,
      subTotal: req.body.subTotal
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
  if (req.body.currUser !== req.body.username)
    return res.status(401).json({
      message: "Uneta mejl adresa mora biti ista kao ona sa kojom ste ulogovani!"
    });
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
