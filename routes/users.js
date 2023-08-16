const express = require('express');
const path = require('path');
var crypto = require('crypto');

//! passport stuff

//! base library
const passport = require('passport');

//! import the strategy as well
const LocalStrategy = require('passport-local');

//! import the DB
const db = require('../models/mongodb/connection');

//! add the verification function (middle-ware)
passport.use(
  new LocalStrategy(function verification(username, password, next) {
    const User = db.collection('users');
    User.findOne({ username })
      .then((res) => {
        //! the user exists here,
        crypto.pbkdf2(
          password,
          res.salt,
          310000,
          32,
          'sha256',
          function (err, hashedPassword) {
            //! ===
            if (crypto.timingSafeEqual(res.password, hashedPassword)) {
              //! success
              next(res);
            } else {
              //! passwords mismatch
              next();
            }
          }
        );
      })
      .catch((err) => {
        next(err);
      });
  })
);

const route = express.Router();

route.get('/', function (request, response) {
  request.get('Accept');
  response
    .set('X-My-Own-Header', 'arfat')
    .sendFile(path.resolve('views/index.html'));
});

route.get('/signup', function (req, res) {
  res.sendFile(path.resolve('views/signup.html'));
});

route.post('/signup', async function (req, res) {
  const { username, email, password } = req.body;
  const UserCollection = db.collection('users');

  //! password hashing
  const salt = crypto.randomBytes(16);

  //! password, salt, iterations, keylen, digest, callback
  console.time();
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    'sha256',
    function (err, hashedPassword) {
      UserCollection.insertOne({
        username,
        email,
        salt,
        password: hashedPassword,
      }).then(() => {
        console.timeEnd();
        res.redirect('/');
      });
    }
  );
});

route.get('/login', function (req, res) {
  res.sendFile(path.resolve('views/login.html'));
});

route.post(
  '/login',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  })
);

route.post('/add-user', async function (req, res) {
  const UserCollection = db.collection('demo_users');
  await UserCollection.insertOne({
    fullname: req.body.fullname,
    age: req.body.age,
  });
  res.status(201).end('got the data');
});

module.exports = {
  userRoutes: route,
};
