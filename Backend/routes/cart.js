const express = require('express');

const CartController = require('../controllers/cart');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, CartController.addUpdateCart);

module.exports = router;