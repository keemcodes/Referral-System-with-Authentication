const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
  },


  ((email, password, done) => {
    User.findOne({
      where: {
        email,
      },
    }).then((dbUser) => {
      if (!dbUser) {
        return done(null, false, {
          message: 'Incorrect email.',
        });
      }
      if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.',
        });
      }
      return done(null, dbUser);
    });
  }),
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;