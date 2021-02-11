const db = require("../models");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    db.Workout.aggregate([
      {
        "$addFields": {
          "totalDuration": {
            "$sum": "$exercises.duration",
          },
        },
      },
    ])
    .sort({ date: -1 })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //post to create a workout
  app.post("/api/workouts", (req, res) => {
    db.Workout.create({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //get request for workouts range (find)
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    db.Workout.aggregate([
      {
        "$addFields": {
          "totalDuration": {
            "$sum": "$exercises.duration",
          },
        },
      },
    ])
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.post("/api/workouts/range", (req, res) => {
    db.Workout.create({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      req.params.id,
      {
        $push: { exercises: req.body },
      },
      {
        new: true,
      }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
