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

exports.getCategories = (req, res, next) => {
  const categoryQuery = Category.find();
  let fetchedCategories;
  categoryQuery
  .then(documents => {
    fetchedCategories = documents;
    return Category.count();
  })
  .then(count => {
    res.status(200).json({
      message: "Categories fetched successfully!",
      categories: fetchedCategories
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Neuspešno dobavljanje kategorija iz baze podataka"
    });
  });
};
