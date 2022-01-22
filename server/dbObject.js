const db = require('./config/db')
const models = require('./models')


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

function payoutByTier(item) {
  switch(item) {
    default:
      return 500
    case 1:
      return 500
    case 2:
      return 1000
    case 3:
      return 1500

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

async function getUserData(id) {
  return await models.User.findOne({ where: { id: id }})
}

async function updateRefCode(id, code) {
  return await models.User.update({ referral_code: code },{ where: { id: id }})
}
async function updateSwipeAccount(id, account) {
  return await models.User.update({ stripe_account: account },{ where: { id: id }})
}

async function updateCollectedReferrals(id) {
  return await models.Referral.update({ collected: 1 },{ where: { referrer_id: id }})
}

async function findReferralsByUserIdJSON(id) {

  return await findReferrals(id).then( (returned) => JSON.stringify(returned.referrals, null, 2))
}

async function findReferralsByUserId(id) {

  return await findReferrals(id).then( (returned) => returned.get({plain:true}))
}

async function calculateTotalPayoutMap(id){
  let total = 0;
  await findReferralsByUserId(id).then(results => {
    results.referrals.map((map) => {
      total+=payoutByTier(map.membership_tier)
    })
  })
  return total
}

async function collectAllReferrals(id){
  let total = 0;
  await findReferralsByUserId(id).then(results => {
    results.referrals.map((map) => {
      total+=payoutByTier(map.membership_tier)
    })
  })
  return total
}

async function calculateTotalPayout(id) {
  let totalPayout;
  await findReferralsByUserId(id).then(results => {
    totalPayout = results.referrals.reduce((total, item) => {
      return item.collected == 0 ? total + payoutByTier(item.membership_tier) : total
    },0)
  })
  return totalPayout
}

function moneyFormatter(money) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

  });
  return formatter.format(money);
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
async function createUserAndReferralTest(count) {
  for(let i = 0; i < count; i++) {
    let tier = Math.floor(Math.random() * 3) + 1
    await createUserTest(tier).then( (returned) => createReferral(returned.id, returned.email, tier))
  }
}
async function createReferral(user, email, tier) {
  return await models.Referral.create({ 
    referrer_id: user,
    referred_email: email,
    membership_tier: tier
  });
}

async function createUserTest(tier) {
  return await models.User.create({ 
    email: randomName() + "@test.com",
    password: "password", 
    referred: 0,
    membership_tier: tier
  });
}

async function dropTables() {
await db.drop();
console.log("All tables dropped!");
}

module.exports.dbObject = 
{ 
  findReferrals, 
  calculateTotalPayout,
  calculateTotalPayoutMap,
  moneyFormatter,
  getUserData, 
  createUserTest, 
  createReferral, 
  sync, 
  forceSync, 
  dropTables, 
  addUser2,
  updateRefCode, 
  updateSwipeAccount, 
  updateCollectedReferrals,
  buildRelationships, 
  buildRelationshipsR, 
  authenticate,
  findReferralsByUserId,
  findReferralsByUserIdJSON,
  createUserAndReferralTest
}
