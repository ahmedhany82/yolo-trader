const Position = require("../models/Position");
const User = require("../models/User");
const router = require("express").Router();


/* route to retrieve the user's portfolio */
router.get("/:userId/portfolio", (req, res, next) => {
  res.json("Retrieve user's portfolio");
});

/* route to update the user's portfolio */
router.post("/:userId/portfolio", (req, res, next) => {
  res.json("Update user's portfolio");
});

/* router to retrieve details of a certain position */
router.get("/:userId/portfolio/:positionId", (req, res, next) => {
  res.json("Retrieve details of a certain position")
})

/* router to update details of a certain position */
router.post("/:userId/portfolio/:positionId", (req, res, next) => {
  res.json("Update details of a certain position")
})

module.exports = router;
