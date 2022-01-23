// Database init
const { dbObject } = require('./dbObject')
dbObject.buildRelationships()
// dbObject.sync()

// dbObject.calculateTotalPayout(2).then(ok => console.log(dbObject.moneyFormatter(ok)))
console.log(dbObject.moneyFormatter(1))