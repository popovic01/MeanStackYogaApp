const express = require('express');

const Product = require("../models/product");

const router = express.Router();

router.post("", (req, res, next) => {
    const product = new Product({
      name: req.body.name,
      price: req.body.price
    });
    product.save().then(createdProduct => {
      res.status(201).json({
        message: 'Product added successfully',
        productId: createdProduct._id
      });
    });
  });
  
  router.put("/:_id", (req, res, next) => {
    const product = new Product({
      _id: req.body._id,
      name: req.body.name,
      price: req.body.price
    });
    Product.updateOne( {_id: req.params._id }, product).then(result => {
      res.status(200).json({ message: 'Update successful! '});
    });
  });
  
  router.get("", (req, res, next) => {
      Product.find().then(documents => {
        res.status(200).json({
          message: 'Products fetched successfully!',
          products: documents
        });
      });
  });
  
  router.get("/:_id", (req, res, next) => {
    Product.findById(req.params._id).then(product => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product nout found!' });
      }
    })
  });
  
  router.delete("/:_id", (req, res, next) => {
    Product.deleteOne({ _id: req.params._id })
      .then(result => {
        console.log(req.params._id);
        res.status(200).json({ message: "Product deleted!" });
      });
  });

  module.exports = router;