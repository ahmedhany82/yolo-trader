const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/signup', (req, res, next) => {
  console.log("signup was hit")
  const { username, password } = req.body;
  if (password.length < 8) {
    return res.status(400).json({ message: 'Your password must be 8 chars minimum' });
  }
  if (username === '') {
    return res.status(400).json({ message: 'Your username cannot be empty' });
  }
  // check if username exists in database -> show message
  User.findOne({ username: username })
    .then(found => {
      if (found !== null) {
        return res.status(400).json({ message: 'Your username is already taken' });
      } else {
        // hash the password, create the user and send the user to the client
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        User.create({
          username: username,
          password: hash
        })
          .then(dbUser => {
            // login with passport:
            req.login(dbUser, err => {
              if (err) {
                console.log("err: ", err)
                return res.status(500).json({ message: 'Error while attempting to login' })
              }
              // we don't redirect to an html page anymore, we just send the user obj to the client
              return res.status(200).json(dbUser);
            });
          })
          .catch(err => {
            console.log("Error while creating user in signup backend: ", err)
            res.json(err);
          })
      }
    })
});

router.post('/login', (req, res, next) => {
  console.log("login was hit")
  passport.authenticate('local', (err, user) => {
    console.log('a')
    if (err) {
      console.log('a')
      return res.status(500).json({ message: 'Error while attempting to login' })
    }
    if (!user) {
      console.log('a')
      return res.status(400).json({ message: 'Wrong credentials' })
    }
    req.login(user, err => {
      if (err) {
        console.log('a')
        return res.status(500).json({ message: 'Error while attempting to login' })
      }
      console.log('a')
      return res.status(200).json(user);
    })
  })
  (req, res, next); //added by me
});

router.delete('/logout', (req, res) => {
  // passport method to log out
  console.log("logout was hit")
  req.logout();
  res.status(200).json({ message: 'Sucessful logout' });
})

router.get('/loggedin', (req, res, next) => {
  // this is where passport stores the logged in user
  res.json(req.user);
});

module.exports = router;