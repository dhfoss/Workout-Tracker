const path = require("path");
const mongoose = require("mongoose");
const db = require("../models");
const router = require("./html-routes");

// This route finds all workouts, sorted from oldest to newest, and calculates the total duration of the workouts.
router.get('/api/workouts', (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {$sum: "$exercises.duration"}
      }
    }
  ])
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.json(err);
  });
});

// This route updates one workout by adding an exercise
router.put('/api/workouts/:id', (req, res) => {
  db.Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}})
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.json(err);
  });
});

// This route creates a new empty workout
router.post('/api/workouts', (req, res) => {
  db.Workout.create({})
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.json(err);
  });
});

// This route totals up the duration of exercises for the 7 most recent workouts.
router.get('/api/workouts/range', (req, res) => {
  db.Workout.aggregate([
    { $sort: { day: -1} },
    { $limit: 7},
    {
      $addFields: {
        totalDuration: {$sum: "$exercises.duration"}
      }
    }
  ])
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.json(err);
  });
});

module.exports = router;