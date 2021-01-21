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
  const thisId = req.params.id;
  db.Workout.findByIdAndUpdate(thisId, {$push: {exercises: req.body}})
  .then(data => {
    res.json(data);
  });
});

module.exports = router;