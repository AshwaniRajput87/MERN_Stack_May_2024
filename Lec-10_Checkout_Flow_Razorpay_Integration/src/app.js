const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Razorpay = require('razorpay');
const shortid = require('shortid');
const crypto = require('crypto');

dotenv.config();

const { PORT, hostname, username, password, SECRET_KEY, RP_PRIVATE_KEY, RP_PUBLIC_KEY, WEBHOOK_SECRET } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

const checkoutController = async(req, res, next) => {

    const { amount } = req.body;

    try{
        const razopayInstance = new Razorpay(
            { 
                key_id: RP_PUBLIC_KEY, 
                key_secret: RP_PRIVATE_KEY
            }
        );

        let options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: shortid.generate(),
            payment_capture: 1
        };

        razopayInstance.orders.create(options, function(err, order) {
            // console.log(order);

            res.status(200).json({
                status: "success",
                data: {
                    id: order.id,
                    currency: order.currency,
                    receipt: order.receipt,
                    amount: order.amount
                }
            })
        });
    }catch(error) {
        next(error);
    }
}

const paymentVerificationController = (req, res, next) =>{

    try{

        if(!WEBHOOK_SECRET){
            throw new Error('Webhook secret ket is not defined');
        }

        const {body, headers} = req;

        const freshSignature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(JSON.stringify(body)).digest('hex');

        console.log(freshSignature);

        const razorpaySignature = headers['x-razorpay-signature'];
        console.log(razorpaySignature);

        if(!razorpaySignature){
            throw new Error('a-razorpay-signatire is not being set in headers');
        }

        if(freshSignature === razorpaySignature) {
            res.status(200).json({
                message: 'ok'
            })
        }

    }catch(error){
        next(error);
    }
}


// integrate the razorpay payment gateway
//1. checkout/order
//2. verify the payment - confirmation of payment
app.post('/checkout', checkoutController);
app.post('/verification', paymentVerificationController);

// About ESLint: https://eslint.org/docs/latest/use/getting-started
app.use((err, req, res, next)=>{// es-lint disabled
    // console.log(err);
    const statusCode = err.statusCode || 500;
    const errMsg = err.message || 'Internal Server Error'
    res.json({
        status: statusCode,
        message: errMsg
    })
});
const dbURL = `mongodb+srv://${username}:${password}@cluster0.jdq8n60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURL).then((connection)=>{
    console.log('Mongodb is connected');
});

app.listen(PORT, hostname, ()=>{
    console.log(`Server is up and running on http://${hostname}:${PORT}`)
})