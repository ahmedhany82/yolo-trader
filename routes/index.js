const { compareSync } = require("bcrypt");
const Position = require("../models/Position");
const { count } = require("../models/User");
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
  console.log("balance was called from backend")
  const user = User.findById(req.params.userId).then(user => {
    return res.status(200).json(user.balance)
  }).catch(error => {
    console.log(error);
  })

});

/* route to update the user's balance */
router.post("/:userId/balance", (req, res, next) => {
  const { balance } = req.body;
  console.log(balance)
  const user = User.findByIdAndUpdate(req.params.userId, {balance: balance}, {new: true}).then(user => {
      return res.status(200).json(user.balance) //({ message: `Your balance is now ${user.balance}` });
  }).catch(error => {
    console.log(error);
  })
});


/* open a position for a given stock ticker */
router.post("/:userId/position/open/:ticker", (req, res, next) => {
  console.log(req.body);
  const { count, averagePrice } = req.body;
  console.log({ count, averagePrice })
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
          console.log("Error while finding user by Id in open position: ", err);
      })    
  })
  .catch(err => {
    console.log(err)
    res.json(err);
  })
})

/* close position for a given stock ticker */

//Find the position associated with the user. There could be other positions with the same ticker for other users
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

/* update position for a given stock ticker */
router.post("/:userId/position/update/:ticker", (req, res, next) => {
  console.log(req.body)
  const { count, averagePrice } = req.body;
  console.log({count, averagePrice});
  const user = User.findById(req.params.userId).populate('holdings').then(user => {
    let position = user.holdings.filter(position => {
      return (position.ticker === req.params.ticker)
    })
    Position.findByIdAndUpdate(position[0]._id, { count: count, averagePrice: averagePrice}, {new: true}).then(updatedPosition => {
      console.log(updatedPosition);
      res.status(200).json({ message: 'Position updated successfully'})
    })
  }).catch(err => {
    console.log("Error while finding a user by ID in update position: ", err);
  })
 })


 /* get the user's position for a given stock ticker */

router.get("/:userId/position/:ticker", (req, res, next) => {
  
  const user = User.findById(req.params.userId).populate('holdings').then(user => {
    let position = user.holdings.filter(position => {
      return (position.ticker === req.params.ticker)
    })
    if(position !== null) {
      res.status(200).json(position);
    } else {
      res.status(500).json(null);
    }
  }).catch(err => {
    console.log("Error while finding a user by ID in getting position: ", err);
  })
  

})

module.exports = router;
