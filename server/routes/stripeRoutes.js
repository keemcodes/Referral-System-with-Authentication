const router = require('express').Router();
const { dbObject } = require('../dbObject') 
const { stripeObject } = require('../stripeObject') 


router.post("/create-payment-intent", async (req, res) => {
  const { item } = req.body;
  console.log(item)
  const total = stripeObject.calculateOrderAmount(item);
  console.log(total)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = stripeObject.createPaymentIntent(total)
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
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

module.exports = router;