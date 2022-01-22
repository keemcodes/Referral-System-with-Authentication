const router = require('express').Router();
const stripe = require("stripe")(process.env.stripe_key);
require("../config/config")
const { dbObject } = require('../config/dbObject')

const calculateOrderAmount = (item) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  switch(item) {
    default:
      return 5000
    case 1:
      return 5000
    case 2:
      return 10000
    case 3:
      return 15000

  }
};

router.post("/create-payment-intent", async (req, res) => {
  const { item } = req.body;
  console.log(item)
  const total = calculateOrderAmount(item);
  console.log(total)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.post("/confirm-payment", async (req, res) => {
  await stripe.paymentIntents.retrieve(
    req.body.paymentId
  ).then((paymentInfo) => {
    console.log(paymentInfo.status) // will replace with function that updates the user in db
    res.send(paymentInfo.status)
  }).catch((error) => {
    console.log(error)
    res.send(error)
  });
});

router.post("/create-stripe-account", async (req, res) => {
  // const { intent } = req.body;
  await stripe.accounts.create({
    type: 'custom',
    country: 'US',
    email: req.body.email,
    capabilities: {
      card_payments: {requested: true},
      transfers: {requested: true},
    },
    business_type: 'individual',
    individual: {
      first_name: 'James',
      last_name: 'Joe',      
      address: {
        line1: 'address_full_match',
        city: 'Fake City',
        postal_code: '90210',
        state: 'California',

      },
      dob: {
        day: 1,
        month: 1,
        year: 1901
      },
      email: req.body.email,
      ssn_last_4: '0000',
      phone: '888-888-8888'
    },
    business_profile: {
      url: 'google.com',
      mcc: '5734'
    },
    external_account: {
      object: 'bank_account',
      country: 'US',
      currency: 'usd',
      routing_number: '110000000', 
      account_number: '000123456789', 
    },
    tos_acceptance: {
      date: 1609798905, 
      ip: '8.8.8.8'
    },
  })
  .then(account => dbObject.updateSwipeAccount(2, account.id))
  .then( () => res.status(200).json('Complete') )
  .catch( () => res.status(400).json('Error') )
});

module.exports = router;