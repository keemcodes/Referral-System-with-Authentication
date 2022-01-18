const router = require('express').Router();
const basicRoutes = require('./basicRoutes')
const authRoutes = require('./authRoutes')
const stripeRoutes = require('./stripeRoutes')

router.use('/', basicRoutes)
router.use('/auth', authRoutes)
router.use('/pay', stripeRoutes)
module.exports = router