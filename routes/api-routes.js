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
      console.log(data);
      res.json(data);
  })
})

module.exports = router;