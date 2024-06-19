const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

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

const otpTemplateStr = fs.readFileSync(path.join(__dirname, 'otp.html'), 'utf-8');

let finalTemplateStr = '';


const sendEmailHelper = async(otp, userName, to) => {
    console.log(to);

    try {

        finalTemplateStr = otpTemplateStr.replace('#{USER_NAME}', userName).replace('#{OTP}', otp);
        console.log(finalTemplateStr);
        const text = `
            Dear, ${userName}, 
        
            Your OTP for forgot password is ${otp}

            Thanks & Regards,
            Company name
            
            `;

        // 2. generate the message

        const emailObj = {
            to: to, // Change to your recipient
            from: 'ashwani.rajput_1@scaler.com', // Change to your verified sender
            subject: 'Reset Password OTP Verification',
            html: finalTemplateStr,
            // text: text,
        }

        // 3. send the email via a nodemailer
        transporter.sendMail(emailObj).then(()=>{
            console.log("Email has been sent");
        }).catch((error)=>{
            console.log(error);
        })
    } catch (error) {
        console.log(error)
    }
}

//sendEmailHelper('234567', 'Ashwani Rajput', 'ashwin.rajput87@gmail.com');

module.exports = sendEmailHelper;