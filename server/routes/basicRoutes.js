const router = require('express').Router();
const {dbObject} = require('../dbObject');
const { body, validationResult } = require('express-validator');
const isAuthenticated = require('../config/isAuthenticated');


    router.get('/getUserData',isAuthenticated, (req, res) => { 
      dbObject.getUserData(req.user.id).then(result => {
        const { id, email, referred, referral_code, membership_tier } = result
        const data = { id, email, referred, referral_code, membership_tier }
        res.status(200).json(data)
      }).catch(error => console.log(error))
    })
    router.get('/getReferredUsers',isAuthenticated, (req, res) => { 
      dbObject.findReferralsByUserId(req.user.id).then(results => {
        res.status(200).json(results.referrals)
      }).catch(error => console.log(error))
    })


    router.post('/updateRefCode',isAuthenticated,
      body('code').isAlphanumeric().not().isEmpty().trim().escape(),
     (req, res) => {
      const code = req.body.code;
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json('Error occured, please make sure your entry is alphanumeric ');   
      console.log(code)
      dbObject.updateRefCode(req.user.id, code).catch(error => console.log(error));
      res.status(200).json('Referral code saved');   
    });
  
module.exports = router;
