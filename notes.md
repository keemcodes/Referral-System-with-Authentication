# Research phase...
* OAuth2
* Auth0
  * Apparantly auth0 is a full solution for offloading the authorization and authentication to their backend services instead of building your own.
  * I can't use anything that offloads the process of building my own authentication layer, but using a library to aid in building my auth layer SHOULD be okay ?
  * I'll check with LT (to be of the safe side, I'll assume no for now)
* JWT
* Implementation without Passport JS ?

# OAuth 2.0 Authorization Code Flow
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

# API Endpoints
* /authorize

* /token


