const Product = require("../models/product");

exports.createProduct = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");  
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      imagePath: url + "/images/" + req.file.filename,
      stock: req.body.stock,
      quantity: 1,
      color: req.body.color,
      category: req.body.category
    });
    product.save().then(createdProduct => {
      res.status(201).json({
        message: 'Product added successfully',
        product: {
          ...createdProduct,
          _id: createdProduct._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Neuspešno kreiranje proizvoda"
      });
    });
  };

exports.updateProduct = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");  
      imagePath = url + "/images/" + req.file.filename
    }
    const product = new Product({
      _id: req.body._id,
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      quantity: 1,
      imagePath: imagePath,
      color: req.body.color,
      category: req.body.category
    });
    Product.updateOne( {_id: req.params._id }, product).then(result => {
      res.status(200).json({ message: 'Update successful! '});
    })
    .catch(error => {
      res.status(500).json({
        message: "Neuspešna izmena proizvoda"
      });
    });
  };

exports.getProducts = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const productQuery = Product.find();
    let fetchedProducts;
    if (pageSize && currentPage) {
      productQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
    }
    productQuery
    .then(documents => {
      fetchedProducts = documents;
      return Product.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Products fetched successfully!",
        products: fetchedProducts,
        maxProducts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Neuspešno dobavljanje proizvoda iz baze podataka"
      });
    });
  };

exports.getProduct = (req, res, next) => {
    Product.findById(req.params._id).then(product => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product nout found!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Neuspešno dobavljanje proizvoda"
      });
    });
  };

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params._id })
      .then(result => {
        console.log(req.params._id);
        res.status(200).json({ message: "Product deleted!" });
      })
      .catch(error => {
        res.status(500).json({
          message: "Neuspešno brisanje proizvoda"
        });
      });
  };