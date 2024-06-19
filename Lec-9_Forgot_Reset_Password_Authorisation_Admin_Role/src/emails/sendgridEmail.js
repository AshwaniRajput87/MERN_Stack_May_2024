
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');

dotenv.config();

const { SENDGRID_API_KEY } = process.env;
console.log(SENDGRID_API_KEY);

sgMail.setApiKey(SENDGRID_API_KEY);

const msg = {
  to: 'ashwin.rajput87@gmail.com', // Change to your recipient
  from: 'ashwani.rajput_1@scaler.com', // Change to your verified sender
  subject: 'Sending Email with SendGrid',
  text: 'Sending an email via sendgrid',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })