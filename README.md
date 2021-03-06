<div align="center">
  <img alt="Logo" src="logo.svg" width="100" />
</div>
<h1 align="center">
  Referral System With Authentication
</h1>

![Screenshot](application.png)

### What is this?
A React JS and Node JS application that uses the Stripe API to process payments.
Application includes an authentication system, referral system, tier subscription system and a payout system. I built this as a demo application for a company.

Yes it's not the most visually pleasing, yes, it could use some refactoring, but it's functional! I'll refactor it later when I have time, maybe wireframe decent UI and deploy this as a product :)

### Installation 

```bash
$ git clone https://github.com/keemcodes/Referral-System-with-Authentication.git
$ cd Referral-System-with-Authentication
$ npm install
```

### Database and Stripe Configuration Guide

This must be completed before moving forward running application
```bash
# 1). Set up MySQL Database
# 2). Add database information to .env file.
# 3). Add Test Key for Stripe API
# .env file goes in the parent directory. I also provided a template ".env.template".
# If you use the template, rename to just ".env" once you've added your details


# .env format below:
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_NAME=dbname
DB_USER=dbuser
DB_PASSWORD=dbpassword
stripe_key=sk_test_0000000000000000000000000000000000000000
REACT_APP_STRIPE_KEY=pk_test_0000000000000000000000000000000000000000
REACT_APP_STRIPE_REDIRECT_URI=http://localhost:3000/afterpayment
```

### Run 

```bash
# In parent directory
$ npm start
```

## Technology Used

Application Stack
* Javascript **(Frontend/Backend)**
* React **(Frontend Library)**
* Node JS **(Backend)**
* Express **(Backend Framework)**
* MySQL + Sequelize **(Database + ORM)**
* Passport JS + Local Strategy **(User Authentication)**
* Express Sessions **(Persist Authentication)**
* Bcrypt **(Password Encryption)**

