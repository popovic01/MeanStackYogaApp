const express = require('express');

const ProductController = require('../controllers/products');

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, ProductController.createProduct);
  
router.put("/:_id", checkAuth, extractFile, ProductController.updateProduct);
  
router.get("", ProductController.getProducts);
  
router.get("/:_id", ProductController.getProduct);
  
router.delete("/:_id", checkAuth, ProductController.deleteProduct);

module.exports = router;