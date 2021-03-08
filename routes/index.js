const { compareSync } = require("bcrypt");
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

/* route to retrieve the user's balance */
router.get("/:userId/balance", (req, res, next) => {
  const user = User.findById(req.params.userId).then(user => {
    return res.json(user.balance)
  }).catch(error => {
    console.log(error);
  })

});

/* route to update the user's balance */
router.post("/:userId/balance", (req, res, next) => {
  const { balance } = req.body;
  console.log(req.body)
  const user = User.findByIdAndUpdate(req.params.userId, {balance: balance}, {new: true}).then(user => {
      return res.status(200).json({ message: `Your balance is now ${user.balance}` });
  }).catch(error => {
    console.log(error);
  })
});

/* router to retrieve details of a certain position */
router.get("/:userId/position/:ticker", (req, res, next) => {
  res.json(`Retrieve details of ${req.params.ticker}`)
  

})

/* open a position for a given stock ticker */
router.post("/:userId/position/open/:ticker", (req, res, next) => {
  const { count, averagePrice } = req.body;
  Position.create({
    ticker: req.params.ticker,
    count: count,
    averagePrice: averagePrice
  }).then(position => {
      const user = User.findByIdAndUpdate(req.params.userId, {
        "$push" : { "holdings": position._id}
      }, {new: true}).then(user => {
          res.status(200).json({ message: 'Position opened successfully'})
      }).catch(err => {
          console.log("Error while finding user by Id: ", err);
      })    
  })
  .catch(err => {
    console.log(err)
    res.json(err);
  })
})

/* close position for a given stock ticker */
router.post("/:userId/position/close/:ticker", (req, res, next) => {
  const position = Position.find({ ticker: req.params.ticker }).then(position => {
    const user = User.findByIdAndUpdate(req.params.userId, {
      "$pull" : { "holdings": position[0]._id}
    }, {new: true}).then(user => {
        Position.deleteOne({ ticker: req.params.ticker }).then(position => {
          res.status(200).json({ message: 'Position closed successfully'})
        }).catch(err => {
          console.log("Error while deleting position: ", err);
        })
    }).catch(err => {
      console.log("Error while updating the user to remove position: ", err);
    })
  }).catch(err => {
    console.log("Error while deleting a position: ", err);
  });
 })

module.exports = router;
