const path = require("path");
const mongoose = require("mongoose");
const db = require("../models");
const router = require("./html-routes");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// This route finds all workouts, sorted from oldest to newest.
router.get('/api/workouts', (req, res) => {
  db.Workout.find({})
  // db.Workout.find().sort({day: -1}).limit(1)
  .then(data => {
      res.json(data);
  });
});

// This route updates one workout by adding an exercise
router.put('/api/workouts/:id', (req, res) => {
  db.Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}})
  .then(data => {
    res.json(data);
  });
});

// This route creates a new empty workout
router.post('/api/workouts', (req, res) => {
  db.Workout.create({})
  .then(data => {
    res.json(data);
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
  });
});

module.exports = router;