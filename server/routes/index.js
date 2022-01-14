const router = require('express').Router();
const basicRoutes = require('./basicRoutes')
const authRoutes = require('./authRoutes')

router.use('/', basicRoutes)
router.use('/auth', authRoutes)
module.exports = router