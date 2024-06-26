# protecting the password or any sensitive information

- In Node.JS, we have crypto module and can use their methods to encypt any sesitive information

# Adding rate limiting
- Rate Limiting is just a technique used to control the number of requests or actions taken by a user.
- In our email service / SMS service, users may flooding the system and by doing so the whole quota/limit of sending SMS/Email can be exhausetd. Therefore, there could a loss of money.

- We should limit to send email/SMS.

- we don't have built-in module for rate limiting. so need to extenal package named as express-rate-limit. need to install yarn add express-rate-limit

# When to add required headers?

- When a user is interacting with web server, certain HTTP headers are required for the secuity purpose.

- Access-Control-Allow-Origin: *

- res.setHeader('Access-Control-Allow-Origin', *);
- res.setHeader('x-security-key', '2473274vchsvdc3245');
