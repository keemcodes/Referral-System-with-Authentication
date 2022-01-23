# Referral-System-with-Authentication

## Stripe API Implementation Research...
* Stripe documentation is literally amazing.
* Code examples are beautiful and easy to implement using their Node supported API.
* [Stripe's quickstart guide](https://stripe.com/docs/payments/quickstart) will pretty much handle exactly what I need... no futher research needed :)
* [Payment Intents](https://stripe.com/docs/payments/payment-intents) will be used to process payments. I can add metadata like membership_tier to track 
* Can use [PaymentIntentStatus](https://stripe.com/docs/payments/payment-intents/verifying-status) to determine the status of the payment (failed, inprogress, success)
* When payment succeeds, we can send the PI id to the backend for verification
  * Once we verify the payment on the backend, we can assign the user the requested tier
* Look into [confirmPayment function](https://stripe.com/docs/js/payment_intents/confirm_payment) to verify payments on the backend
* Use [retrieve](https://stripe.com/docs/api/payment_intents/retrieve) function on PaymentIntent object to retrieve a payment from the backend
  * We can supply the backend with the PI ID from the frontend
* Look into [stripe payout guide](https://stripe.com/docs/connect/add-and-pay-out-guide)
## New Authentication Implementation
**Reference my portfolio site's authentication system**
* Authenticate user with the LocalStrategy provided by passportJS
  * With this authentication strategy, user will provide a username and password to identify themselves
* Once we authenticate the user we will persist their login using passport sessions

## High Level Front End Action Flow REVISED
* Homepage 
  * will include login/register box
* Plan Selection
  * Plan options will include bronze, silver, and gold
    * Bronze
      * Costs $50
      * Referral Payout $5
    * Silver
      * Cost $100
      * Referral Payout $10
    * Gold
      * Cost $150
      * Referral Payout $15
  * Three cards will display each plan option
  * Selecting an option will take user to the checkout page or popup
* Checkout page is simple, will process checkout and forward user to dashboard afterwards
* Dashboard
  * Will show all claimed referrals (user who sign up using their referral code)
  * Dashboard will also show how much the user made in total
  * Dashboard will include payout button that won't be selectable until their balance is greater than 0.
  * Dashboard should also include payout settings to input an account for users to payout to? 
    * Research if stripe allows us to store card data on their system (i think its the card token thing I read in their docs, review this)

## Backend
**Database**
* Users Table
  * id
  * email
  * password
  * referred (boolean)
  * referral_code
  * stripe_account
  * membership_tier
  * created_at
  * updated_at

* Referrals Table
  * id
  * referred_email
  * referrer_id (foreign key)
  * membership_tier
  * collected (boolean)
  * created_at
  * updated_at

**API Endpoints**
* /register
  * email
  * password
* /login
  * email
  * password
* /logout
* /authenticate
* /subscribe
  * referral code
  * membership tier
  * payment info for stripe

## Front End Design Inspo
* Login / register page LOL (already have a concept)
* Plan selection UI

