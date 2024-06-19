const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const { SENDGRID_API_KEY } = process.env;
console.log(SENDGRID_API_KEY);
// Follow this for registering the technical details of Sendgrid: https://www.twilio.com/en-us/blog/send-smtp-emails-node-js-sendgrid#:~:text=For%20the%20authentication%20data%2C%20you,be%20your%20actual%20API%20key

// 1. Register the technical details with the nodemailer
const techDetails = {
   host: 'smtp.sendgrid.net',
   port: 465,
   secur: true,
   auth: {
       user: "apikey",
       pass: SENDGRID_API_KEY
   }
};

const transporter = nodemailer.createTransport(techDetails);

// 2. generate the message

const emailObj = {
  to: 'ashwin.rajput87@gmail.com', // Change to your recipient
  from: 'ashwani.rajput_1@scaler.com', // Change to your verified sender
  subject: 'Sending Email With NodeMailer',
//   text: 'Sending an email via nodemailer1',
  html: '<strong>Easy to send the emails via nodemailer using any Email Service Provider</strong>',
}


// 3. send the email via a nodemailer

transporter.sendMail(emailObj).then(()=>{
    console.log("Email has been sent");
}).catch((error)=>{
    console.log(error);
})