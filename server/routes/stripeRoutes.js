const router = require('express').Router();
const { dbObject } = require('../dbObject') 
const { stripeObject } = require('../stripeObject') 
const isAuthenticated = require('../config/isAuthenticated');
const db = require('../config/db');



router.post("/create-payment-intent", isAuthenticated, async (req, res) => {
  const { item } = req.body;
  console.log(item)
  const total = stripeObject.calculateOrderAmount(item);
  console.log(total)
  // Create a PaymentIntent with the order amount and currency
  stripeObject.createPaymentIntent(total)
  .then((paymentIntent) => res.send({
    clientSecret: paymentIntent.client_secret,
  }));
});

router.post("/confirm-payment", isAuthenticated, async (req, res) => {
  stripeObject.confirmPayment(req.body.paymentId)
  .then((paymentInfo) => {
    console.log(paymentInfo.status) // will replace with function that updates the user in db
    res.send(paymentInfo.status)
  })
  .catch((error) => {
    console.log(error)
    res.send(error)
  });
});

router.post("/create-stripe-account", isAuthenticated, async (req, res) => {
  // const { intent } = req.body;
  stripeObject.createStripeAccount(req.body.email)
  .then(account => dbObject.updateSwipeAccount(req.user.id, account.id))
  .then( () => res.status(200).json('Complete') )
  .catch( () => res.status(400).json('Error') )
});

router.get('/get-payout', isAuthenticated, (req, res) => { 
  dbObject.calculateTotalPayout(req.user.id).then(result => {
    res.status(200).send(dbObject.moneyFormatter(result))
  })
  .catch(error => {
    res.status(400).send('Error')
    console.log(error)
  })
})

router.post("/payout", isAuthenticated, async (req, res) => {
  dbObject.getUserData(req.user.id).then( data => {
    dbObject.calculateTotalPayout(req.user.id).then(result => {
      if (result <= 0) throw "Not enough money"
      stripeObject.transferPayout(data.stripe_account, result)
      .then( () => dbObject.updateCollectedReferrals(req.user.id))
      .then( () => res.status(200).send('Success'))
      .catch(error => {
        res.status(400).json(error)
        console.log(error)
      })
    })
    .catch(error => {
      res.status(400).json(error)
      console.log(error)
    })
  })
});

module.exports = router;