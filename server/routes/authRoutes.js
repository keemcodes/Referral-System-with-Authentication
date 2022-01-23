const router = require('express').Router();
const passport = require('../config/passport');
const { dbObject } = require('../dbObject') 
const { stripeObject } = require('../stripeObject') 
const isAuthenticated = require('../config/isAuthenticated');


router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req);
  res.json(req.user);
});

router.post('/register', (req, res) => {
  const { email, password, code } = req.body
  if (code) {
    dbObject.getUserByReferralCode(code)
    .then(userAcc => {
      if (userAcc?.id === undefined) throw 'Referral code invalid'
      dbObject.createReferral(userAcc.id, email, 0)
      .then(() => dbObject.createUser(email, password, 0))
      .then(user => {
        dbObject.updatedReferredStatus(user.id, 1)
        stripeObject.createStripeAccount(email)
        .then(account => dbObject.updateSwipeAccount(user.id, account.id))
        .then(() => res.status(200).send('Account Created'))
      })
      .catch(() => res.status(400).send('Error creating account, probably already exists'))
    })
    .catch((err) => res.status(400).send(err))
  } else {
    dbObject.createUser(email, password, 0)
    .then(user => {
      if (code) dbObject.getUserByReferralCode(code)
      .then(userAcc => {
        if (userAcc?.id) dbObject.createReferral(userAcc.id, email, 0)
        .then(() => dbObject.updatedReferredStatus(user.id, 1))
      })
      .catch(() => res.status(400).send('Error'))
      stripeObject.createStripeAccount(email)
      .then(account => dbObject.updateSwipeAccount(user.id, account.id))
      .then(() => res.status(200).send('Account Created'))
      .catch(() => res.status(400).send('Error generating stripe account'))
    })
    .catch(() => res.status(400).send('Error creating account, probably already exists'))
  }
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
        tier: req.user.membership_tier,
        referred: req.user.referred,
        code: req.user.referral_code,
      });
    }
});
  
router.get('/secrets', isAuthenticated, (req, res) => {
  res.json('not so much a secret huh');
});


module.exports = router;