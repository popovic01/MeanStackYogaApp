const Workout = require("../models/workout");

exports.createWorkout = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");    
    const workout = new Workout({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,  
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
    };

exports.updateWorkout = (req, res, next) => {
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
      quantity: req.body.quantity,
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
  };

exports.getWorkouts = (req, res, next) => {
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
  };

exports.getWorkout = (req, res, next) => {
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
  };

exports.deleteWorkout = (req, res, next) => {
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
  };
