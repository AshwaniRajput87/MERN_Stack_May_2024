const {rateLimit} = require('express-rate-limit');

const rateLimiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2mins
	max: 2,
    message: "Too many request from this IP, Please try again after sometime"
});

console.log(rateLimiter);

module.exports = rateLimiter;