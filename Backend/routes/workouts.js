const express = require('express');

const Workout = require("../models/workout");

const router = express.Router();

router.post("", (req, res, next) => {
    const workout = new Workout({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });
    workout.save().then(createdWorkout => {
      res.status(201).json({
        message: 'Workout added successfully',
        workoutId: createdWorkout._id
      });
    }); //cuvanje u bazu
  });
  
  //patch - update-ovanje postojeceg objekta novim informacijama
  //put - update-ovanje celog objekta
  router.put("/:_id", (req, res, next) => {
    const workout = new Workout({
      _id: req.body._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });
    Workout.updateOne({ _id: req.params._id }, workout).then(result => {
      res.status(200).json({ message: 'Update successful!' });
    });
  });
  
  router.get("", (req, res, next) => {
      Workout.find().then(documents => {
        res.status(200).json({
          message: 'Workouts fetched successfully!',
          workouts: documents
        });
      });
  });
  
  router.get("/:_id", (req, res, next) => {
    Workout.findById(req.params._id).then(workout => {
      if (workout) {
        res.status(200).json(workout);
      } else {
        res.status(404).json({ message: 'Workout nout found!' });
      }
    })
  });
  
  router.delete("/:_id", (req, res, next) => {
    Workout.deleteOne({ _id: req.params._id })
      .then(result => {
        console.log(req.params._id);
        res.status(200).json({ message: "Workout deleted!" });
      });
  });

  module.exports = router;