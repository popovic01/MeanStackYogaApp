const express = require('express');
const multer = require('multer');

const Course = require("../models/course");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "../Backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post("", checkAuth,
  multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");  
  const course = new Course({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imagePath: url + "/images/" + req.file.filename
    });
    course.save().then(createdCourse => {
      res.status(201).json({
        message: 'Course added successfully',
        course: {
          ...createdCourse,
          _id: createdCourse._id
        }
      });
    }); //cuvanje u bazu
  });
  
  //patch - update-ovanje coursojeceg objekta novim informacijama
  //put - update-ovanje celog objekta
  router.put("/:_id", checkAuth,
    multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");  
      imagePath = url + "/images/" + req.file.filename
    }
    const course = new Course({
      _id: req.body._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imagePath: imagePath
    });
    Course.updateOne({ _id: req.params._id }, course).then(result => {
      res.status(200).json({ message: 'Update successful!' });
    });
  });
  
  router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const courseQuery = Course.find();
    let fetchedCourses;
    if (pageSize && currentPage) {
      courseQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
    }
    courseQuery
    .then(documents => {
      fetchedCourses = documents;
      return Course.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Courses fetched successfully!",
        courses: fetchedCourses,
        maxCourses: count
      });
    });
  });
  
  router.get("/:_id", (req, res, next) => {
    Course.findById(req.params._id).then(course => {
      if (course) {
        res.status(200).json(course);
      } else {
        res.status(404).json({ message: 'Course nout found!' });
      }
    })
  });
  
  router.delete("/:_id", checkAuth, (req, res, next) => {
    Course.deleteOne({ _id: req.params._id })
      .then(result => {
        console.log(req.params._id);
        res.status(200).json({ message: "Course deleted!" });
      });
  });

  module.exports = router;