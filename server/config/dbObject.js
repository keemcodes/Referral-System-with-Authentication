const db = require('./db')
const models = require('../models')


// Legacy functions from my initial build :)
function randomName() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}
async function addUser() {
  try {
      const akeem2 = await models.User.create({ 
          firstName: randomName(),
          lastName: randomName(), 
      });
      console.log("Random's auto-generated ID:", akeem2.id);

  }
  catch (error) {
      console.error('Unable to insert here is why:', error);

  }

}
async function addUser2() {
  try {
      const akeem2 = await models.User.create({ 
          email: randomName() + "@test.com",
          password: "password", 
          referred: 0,
           
      });
      console.log("Random's auto-generated ID:", akeem2.id);

  }
  catch (error) {
      console.error('Unable to insert here is why:', error);

  }

}

function buildRelationships() {
  models.User.hasMany(models.Referral, { 
    foreignKey: "referrer_id",
    as: "referrals" 
  });
  models.Referral.belongsTo(models.User, {
      foreignKey: "referrer_id",
      as: "tutorial",
  })
}

function buildRelationshipsR() {
  models.User.hasMany(models.Referral, { 
    as: "referrals" 
  });
  models.Referral.belongsTo(models.User, {
      foreignKey: "referrer_id",
      as: "tutorial",
  })
}

async function findReferrals(referralId) {
  return await models.User.findByPk(referralId, { include: ['referrals']})
}

async function findReferralsByUserIdJSON() {

  await findReferrals(2).then( (returned) => console.log(JSON.stringify(returned, null, 2)))
}

async function findReferralsByUserId() {

  await findReferrals(2).then( (returned) => console.log(returned.get({plain:true})))
}



async function authenticate() {
  try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  
} 

async function sync() {
  await db.sync()
  .catch( error => {
    console.log(error);
  });
  console.log("All models were synchronized successfully.");
}
async function forceSync() {
  await db.sync({force: true})
  .catch( error => {
    console.log(error);
  });
  console.log("All models were synchronized successfully.");
}
async function createUserAndReferralTest() {

  await createUser().then( (returned) => createReferral(returned.id))
}
async function createReferral(user) {
  return await models.Referral.create({ 
    referrer_id: user
  });
}

async function createUser() {
  return await models.User.create({ 
    email: randomName() + "@test.com",
    password: "password", 
    referred: 0,
  });
}

async function dropTables() {
await db.drop();
console.log("All tables dropped!");
}

module.exports.dbObject = { findReferrals, createUser, createReferral, sync, forceSync, dropTables, addUser2, buildRelationships, buildRelationshipsR, authenticate }
