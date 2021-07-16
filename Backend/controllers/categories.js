const Category = require("../models/category");

exports.createCategory = (req, res, next) => {
  const category = new Category({name: req.body.category});
      category.save().then(createdCategory => {
        res.status(201).json({
          message: 'Category added successfully',
          category: {
            ...createdCategory,
            _id: createdCategory._id
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Neuspešno kreiranje kategorije"
        });
        console.log(error);
      }); //cuvanje u bazu
};
