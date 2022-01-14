const router = require('express').Router();
const {dbObject} = require('../config/dbObject');
const { body, validationResult } = require('express-validator');
const isAuthenticated = require('../config/isAuthenticated');



  // On load...
  dbObject.findProjects().then(result => {
      router.get('/projects', (req, res) => {
    
        res.status(200).json(result)
        
      })
    
    }).catch(error => console.log(error))

    router.get('/contacts', isAuthenticated, (req, res) => { 
      dbObject.findContacts().then(result => {
        res.status(200).json(result)
      }).catch(error => console.log(error))
    })

    router.post('/formPost',
      body('name').not().isEmpty().trim().escape(),
      body('email').isEmail().normalizeEmail(),
      body('message').not().isEmpty().trim().escape(),
     (req, res) => {
      const name = req.body.name;
      const email = req.body.email;
      const message = req.body.message;
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });   
      console.log(name, email, message)
      dbObject.createContact(name, email, message).catch(error => console.log(error));
      res.send({ errors: { success: `Thank you ${name}, I've received your message`, } });
    });
  
module.exports = router;
