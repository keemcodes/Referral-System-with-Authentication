const router = require('express').Router();
const { dbObject } = require('../dbObject') 
const { stripeObject } = require('../stripeObject') 


router.post("/create-payment-intent", async (req, res) => {
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

router.post("/confirm-payment", async (req, res) => {
  stripeObject.confirmPayment(req.body.paymentId)
  .then((paymentInfo) => {
    console.log(paymentInfo.status) // will replace with function that updates the user in db
    res.send(paymentInfo.status)
  }).catch((error) => {
    console.log(error)
    res.send(error)
  });
});

router.post("/create-stripe-account", async (req, res) => {
  // const { intent } = req.body;
  stripeObject.createStripeAccount(req.body.email)
  .then(account => dbObject.updateSwipeAccount(2, account.id))
  .then( () => res.status(200).json('Complete') )
  .catch( () => res.status(400).json('Error') )
});

router.post("/payout", async (req, res) => {
  // const { intent } = req.body;
  dbObject.findReferralsByUserId(2).then(results => {
    results.referrals.map(map => console.log(map.membership_tier))
    res.status(200).json(results)
  })
  .catch(error => console.log(error))

  // stripeObject.createStripeAccount(req.body.email)
  // .then(account => dbObject.updateSwipeAccount(2, account.id))
  // .then( () => res.status(200).json('Complete') )
  // .catch( () => res.status(400).json('Error') )
});

module.exports = router;