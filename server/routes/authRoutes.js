const router = require('express').Router();
const models = require('../models');
const passport = require('../config/passport');
const isAuthenticated = require('../config/isAuthenticated');


router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req);
  res.json(req.user);
});

router.post('/register', (req, res) => {
  models.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbResponse) => {
      res.json(dbResponse);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json('logout successful');
});

router.get('/authenticate', (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
});
  
router.get('/secrets', isAuthenticated, (req, res) => {
  res.json('not so much a secret huh');
});


module.exports = router;