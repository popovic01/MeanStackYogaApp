const express = require('express');

const OrderController = require('../controllers/orders');
const UserController = require('../controllers/orders');
const ProductController = require('../controllers/orders');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/order/create/:userId", checkAuth,
    addOrderToUserHistory,
    decreaseQuantity,
    create
  ); // creating order

router.get("/order/list/:userId", checkAuth, isAdmin, listOrders); // get all orders from one user

router.get("/order/status-values/:userId", checkAuth,
isAdmin,
getStatusValues
); // geting status of order for Admin list of orders

router.put(
"/order/:orderId/status/:userId",
checkAuth,
isAdmin,
updateOrderStatus
); // updating  order status

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;