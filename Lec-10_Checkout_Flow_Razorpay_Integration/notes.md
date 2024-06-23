1. Razorpay payment gateway:
https://razorpay.com/
2. Razorpay payment gateway integration guide:
https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/
3. Payment verification intergration guide:
https://razorpay.com/docs/webhooks/validate-test/#application-running-on-localhost

# what is webhook?

   - It is a way for an application to send the automated messages or data to another application in real-time.
   - It is used in real-time communication b/w applications or services over web.
   - webhook references:
   1. https://razorpay.com/docs/webhooks/
   2. https://razorpay.com/docs/webhooks/validate-test/#application-running-on-localhost

  # For webhook payment events capture:
  Web integration guide:

  https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/#32-payment-capture

  create the frontend payment app via react:

  npm create vite@latest/ yarn create vite


  # how to integrate razorpay payment gateway?
https://x.razorpay.com/auth - > Do sign up without your PAN and KYC details
Do login -> land on the dashboard of razorpay
got to developers tab on left side menu of razorpay dasboard.
First if you need to create API keys(private and secret key) or create a webhook: go to account and settings tab of razorpay dashboard -> go to API keys to generate public and private keys


Follow the razorpay integration steps:
https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/
Once the order id has been created.
Then payment gateways has to notify about confirmation

For payment confirmation, you need to use the webhooks:
https://razorpay.com/docs/webhooks/ (go through this doc)
How to validate the webhook:
https://razorpay.com/docs/webhooks/validate-test/

you need to create a public url, for that you need a tunnel and that is being created via ngrok : https://ngrok.com/
To create a web hook in razorpay - Goto account and settings -> webhooks and paste the ngrok public URL(https://473f-2401-4900-1c75-b271-c1aa-73c1-540e-308c.ngrok-free.app) and create webhook secret key in env file and provide that value in webhook of razorpay and provide email and select events to capture-> save 
How to verify the payments: 
need a encrypted signature and razorpay hearder
x-razorpay-signature: encrypted signtaure (copy paste the encrypted signature)
to create the encrypted signature you need crypto package. -> // nodeJS crypto module -> https://nodejs.org/docs/latest/api/crypto.html#hmacdigestencoding
hit this end point on postman for verification:
http://localhost:3000/verification
set headers:
x-razorpay-signature: f034bffdd219ce37a8cce11fbff9421246e9b5629ec02aa5abb4ec79b48d23c5
give body: {
"order_id": "order_O6GT0Lv8onvyYF"
}
Razorpay 
https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/#2-test-integration