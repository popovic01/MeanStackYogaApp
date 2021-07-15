const express = require('express');

const WorkoutController = require('../controllers/workouts');

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, WorkoutController.createWorkout);
  
router.put("/:_id", checkAuth, extractFile, WorkoutController.updateWorkout);
  
router.get("", WorkoutController.getWorkouts);
  
router.get("/:_id", WorkoutController.getWorkout);
  
router.delete("/:_id", checkAuth, WorkoutController.deleteWorkout);

module.exports = router;