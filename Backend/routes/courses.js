const express = require('express');

const Course = require("../models/course");

const router = express.Router();

router.post("", (req, res, next) => {
    const course = new Course({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });
    course.save().then(createdCourse => {
      res.status(201).json({
        message: 'Course added successfully',
        courseId: createdCourse._id
      });
    }); //cuvanje u bazu
  });
  
  //patch - update-ovanje postojeceg objekta novim informacijama
  //put - update-ovanje celog objekta
  router.put("/:_id", (req, res, next) => {
    const course = new Course({
      _id: req.body._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });
    Course.updateOne({ _id: req.params._id }, course).then(result => {
      res.status(200).json({ message: 'Update successful!' });
    });
  });
  
  router.get("", (req, res, next) => {
      Course.find().then(documents => {
        res.status(200).json({
          message: 'Courses fetched successfully!',
          courses: documents
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
  
  router.delete("/:_id", (req, res, next) => {
    Course.deleteOne({ _id: req.params._id })
      .then(result => {
        console.log(req.params._id);
        res.status(200).json({ message: "Course deleted!" });
      });
  });

  module.exports = router;