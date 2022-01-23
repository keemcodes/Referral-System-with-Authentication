const stripe = require("stripe")(process.env.stripe_key);

module.exports.stripeObject = {
  calculateOrderAmount: function calculateOrderAmount(item) {
    switch(item) {
      default:
        return 5000
      case -1:
        return 100000
      case 1:
        return 5000
      case 2:
        return 10000
      case 3:
        return 15000
  
    }
  },
  createPaymentIntent: async function createPaymentIntent(total, tier) {
    return await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        tier: tier
      },
      description: tier,
    });
  },
  confirmPayment: async function confirmPayment(paymentId) {
    return await stripe.paymentIntents.retrieve(paymentId)
  },
  transferPayout: async function transferPayout(account, amount) {
    return await stripe.transfers.create({
      amount: amount,
      currency: "usd",
      destination: account,
    });
  },
  createStripeAccount: async function createStripeAccount(email) {
    return await stripe.accounts.create({
      type: 'custom',
      country: 'US',
      email: email,
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
        email: email,
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
  }
}