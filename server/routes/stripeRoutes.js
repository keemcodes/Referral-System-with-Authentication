const router = require('express').Router();
const stripe = require("stripe")(process.env.stripe_key);
require("../config/config")

const calculateOrderAmount = (item) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1000;
};

router.post("/create-payment-intent", async (req, res) => {
  const { item } = req.body;
  console.log(item)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(item),
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

router.post("/confirm-payment-intent", async (req, res) => {
  // const { intent } = req.body;
  await stripe.paymentIntents.retrieve(
    req.body.intent
  ).then((test) => {
    console.log(test)
    res.send(test)
  }).catch((error) => {
    console.log(error)
    res.send(error)
  });
});

module.exports = router;