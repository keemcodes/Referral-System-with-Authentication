// Express
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express()
const port = process.env.PORT || 4242

// Routes
const routes = require('./routes')

// Configs
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// Express session middleware
// =============================================
app.use(session({ secret: 'notsuuch a secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Database testing
const { dbObject } = require('./dbObject')
const { stripeObject } = require('./stripeObject')
// dbObject.dropTables();
// dbObject.addInitialProjects();
dbObject.buildRelationships()
// dbObject.forceSync()
// dbObject.sync()
// dbObject.createUserAndReferralTest(10)
// dbObject.updateRefCode(1, "keemcodes")
// dbObject.updateCollectedReferrals(2)
// dbObject.getUserData(2).then(data => console.log(data))
// dbObject.calculateTotalPayout(2).then((returned) => console.log(dbObject.moneyFormatter(returned)))
// dbObject.calculateTotalPayoutMap(2).then((returned) => console.log(returned))
// for(let i = 0; i < 10; i++) {
//   dbObject.createUserAndReferralTest()
// }
// dbObject.findReferralsByUserId(2).then(results => console.log(results.referrals))
// dbObject.findReferralsByUserIdJSON(2) 

// dbObject.createUserTest(1)
// .then(returned => console.log(returned))
// .then()
//  Routing...

// dbObject.getUserData(2).then( data => {
//   dbObject.calculateTotalPayout(2).then(result => {
//     if (result <= 0) return console.log("Nope")
//     stripeObject.transferPayout(data.stripe_account, result)
//   })
// })
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})