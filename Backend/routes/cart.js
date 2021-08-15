const express = require('express');

const CartController = require('../controllers/cart');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/order-details", checkAuth, CartController.orderDetails);

router.get("", checkAuth, CartController.getAllCarts);

router.post("/one-user", checkAuth, CartController.getAllCartsFromOneUser);

module.exports = router;