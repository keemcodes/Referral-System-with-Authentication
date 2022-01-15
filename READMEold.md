## Authentication Research phase...
* OAuth2
* Auth0
  * Apparantly auth0 is a full solution for offloading the authorization and authentication to their backend services instead of building your own.
  * I can't use anything that offloads the process of building my own authentication layer, but using a library to aid in building my auth layer SHOULD be okay ?
  * I'll check with LT (to be of the safe side, I'll assume no for now)
* JWT
* ~~Implementation without Passport JS ?~~
* Implementation with passport JS is a go!
* [Reviewing Passport JS OAuth Flow Implementation Strategy](https://github.com/jaredhanson/passport-oauth2)
* Code Implementation of OAuth2Strategy... (might be outside of this projects scope)
```javascript
passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.example.com/oauth2/authorize',
    tokenURL: 'https://www.example.com/oauth2/token',
    clientID: EXAMPLE_CLIENT_ID,
    clientSecret: EXAMPLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/example/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```
* Code Implementation of OAuth2 routes via Express Middleware...
```javascript
app.get('/auth/example',
  passport.authenticate('oauth2'));

app.get('/auth/example/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```
* **Confirming with LT whether I should focus on the authentication flow or authorization flow.**
  * Authorization flow seems a little out of scope going by the ambiguous nature of the document they sent over
* Authorization is determining what a user has access to
* Authentication is determing who a user is

## OAuth 2.0 Authorization Code Flow (might be totally outside of this project's scope)
Steps
(authorize, token, Authentication)
* Authorize 
  * Sends a request to authorization endpoint (includes client id, response type, scope and redirect uri after authorization is complete)
  * The request is validated and user will be prompted to login
  * Once the user logs in, an authorization code will be generated
  * The user will be redirected to the redirect uri with the authorization code
* Token
  * The authorization code will validated at the token endpoint
  * Once the auth code is validated, it will be exchanged for an access token.
* Authentication
  * Access token will be used to validate all application functionality that sits behind an authwall

## API Endpoints (might be totally outside of this project's scope)
* /authorize
  * User will pass client_id and client_secret into the body of the POST request
  * We check our DB if a user with the id and secret exists, if so we prompt the user to login
  * After a successful login, we generate a token and store it to our db for later review
* /token

* /authenticate

## High Level Front End Action Flow
* Homepage will include a css card based plan selection screen on the left
* Homepage will include a register/login section on right
  * If you select login instead of register, plan selection screen will disappear
  * After user is logged in and authenticated, the user will be sent to the dashboard
* Dashboard 
  * Will show all the claimed referrals (users who sign up using their referral code)
  * Dashboard will also show how much the user made in total

# Everything above is irrelevant :)