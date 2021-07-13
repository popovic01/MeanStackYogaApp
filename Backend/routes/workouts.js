const express = require('express');
const multer = require('multer');

const Workout = require("../models/workout");
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
  const workout = new Workout({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imagePath: url + "/images/" + req.file.filename
    });
    workout.save().then(createdWorkout => {
      res.status(201).json({
        message: 'Workout added successfully',
        workout: {
          ...createdWorkout,
          _id: createdWorkout._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Neuspešno kreiranje treninga"
      });
    }); //cuvanje u bazu
  });
  
  //patch - update-ovanje postojeceg objekta novim informacijama
  //put - update-ovanje celog objekta
  router.put("/:_id", checkAuth,
    multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");  
      imagePath = url + "/images/" + req.file.filename
    }
    const workout = new Workout({
      _id: req.body._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imagePath: imagePath
    });
    Workout.updateOne({ _id: req.params._id }, workout).then(result => {
      res.status(200).json({ message: 'Update successful!' });
    })
    .catch(error => {
      res.status(500).json({
        message: "Neuspešna izmena treninga"
      });
    });
  });
  
  router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const workoutQuery = Workout.find();
    let fetchedWorkouts;
    if (pageSize && currentPage) {
      workoutQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
    }  
    workoutQuery
    .then(documents => {
      fetchedWorkouts = documents;
      return Workout.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Workouts fetched successfully!",
        workouts: fetchedWorkouts,
        maxWorkouts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Neuspešno dobavljanje treninga iz baze podataka"
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
    .catch(error => {
      res.status(500).json({
        message: "Neuspešno dobavljanje treninga"
      });
    });
  });
  
  router.delete("/:_id", checkAuth,
    (req, res, next) => {
    Workout.deleteOne({ _id: req.params._id })
      .then(result => {
        console.log(req.params._id);
        res.status(200).json({ message: "Workout deleted!" });
      })
      .catch(error => {
        res.status(500).json({
          message: "Neuspešno brisanje treninga"
        });
      });
  });

  module.exports = router;