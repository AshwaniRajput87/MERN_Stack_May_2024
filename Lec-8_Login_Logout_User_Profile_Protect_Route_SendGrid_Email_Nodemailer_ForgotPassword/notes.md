# How can you send the email via backend?

  - Whenever you need to send the email -> you need a email service provider-> Sendgrid :
  1. Register yourself (support@scaler.com/ashwani.rajput_1@scaler.com) - sender
                      Reciever - ashwin.rajput@gmail.com
  2. Login
  3. Land on the sendgrid dashboard page
  4. Integrate the enail service API in your backend code: https://app.sendgrid.com/guide/integrate
  5. install sendgrid:
     npm i @sendgrid/mail or yarn add @sendgrid/mail


# How to send the email via node apps?

  - via nodemailer -  a library to use for sending the email from the nodeJS applications.

  - You need to install this package:
    yarn add nodemailer/ npm i nodemailer

  - Nodemailer can be used with SMTP server for sending the emails.
# To generate the Email/SMS templates:

  1. https://beefree.io/
  2. https://mailchimp.com/pricing/marketing/