<div align="center">
  <img alt="Logo" src="logo.svg" width="100" />
</div>
<h1 align="center">
  Referral System With Authentication
</h1>

![website](screenshot.png)

### Database and Stripe Configuration Guide
```bash
# 1). Set up MySQL Database
# 2). Add database information to .env file.
# 3). Add Test Key for Stripe API
# .env file goes in the parent directory of this repo
# .env format below:
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_NAME=dbname
DB_USER=dbuser
DB_PASSWORD=dbpassword
stripe_key=sk_test_0000000000000000000000000000000000000000
```


### Installation 

```bash
$ git clone https://github.com/keemcodes/Referral-System-with-Authentication.git
$ cd Referral-System-with-Authentication
$ npm install
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

