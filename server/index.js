// Express
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express()
const port = process.env.PORT || 3001

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
const { dbObject } = require('./config/dbObject')
// dbObject.dropTables();
// dbObject.addInitialProjects();
dbObject.buildRelationships()
// dbObject.forceSync()
// dbObject.sync()
async function awaitingFunc() {

  await dbObject.createUser().then( (returned) => dbObject.createReferral(returned.id))
}
async function awaitingFunc2() {

  await dbObject.createUser().then( (returned) => dbObject.createReferral(returned.id))
}
// awaitingFunc()
// dbObject.createReferral(2);  
// dbObject.createReferral(2);  
// dbObject.createReferral(2);  
// dbObject.createReferral(2);  
async function awaitingFunc3() {

  await dbObject.findReferrals(2).then( (returned) => console.log(JSON.stringify(returned, null, 2)))
}

async function awaitingFunc4() {

  await dbObject.findReferrals(2).then( (returned) => console.log(returned.get({plain:true})))
}
awaitingFunc4()
// for(let i = 0; i < 10; i++) {
//   // dbObject.addUser2()
//   awaitingFunc()

// }



//  Routing...
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})