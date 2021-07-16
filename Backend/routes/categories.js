const express = require('express');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const CategoryController = require('../controllers/categories');

router.post("", checkAuth, CategoryController.createCategory);

module.exports = router;