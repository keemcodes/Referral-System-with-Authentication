// Database init
const { dbObject } = require('./dbObject')
dbObject.buildRelationships()
dbObject.sync()