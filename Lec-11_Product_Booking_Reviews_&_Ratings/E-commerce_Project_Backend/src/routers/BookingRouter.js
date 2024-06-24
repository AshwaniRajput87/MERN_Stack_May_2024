const express = require('express');
const Razorpay = require('razorpay');
const shortid = require('shortid');
const dotenv = require('dotenv');

const BookingModel = require('../models/BookingModel');
const { protectRouteMiddleWare } = require('../controllers/AuthController');
const UserModel = require('../models/UserModel');
const BookingRouter = express.Router();

dotenv.config();

const { PORT, hostname, username, password, SECRET_KEY, RP_PRIVATE_KEY, RP_PUBLIC_KEY, WEBHOOK_SECRET } = process.env;

const razorpayInstance = new Razorpay(
    { 
        key_id: RP_PUBLIC_KEY, 
        key_secret: RP_PRIVATE_KEY
    }
);

const initiliazeBookingController = async(req, res, next) =>{

    const userId = req.userId;
    console.log(userId);
    const { productId } = req.params;
    console.log(productId);

    const { priceAtThat } = req.body;
    console.log(priceAtThat);

    const status = 'pending';

    try {

        const bookingObj = await BookingModel.create(
            {
                
                priceAtThat: priceAtThat,
                status: status,
                userId: userId,
                productId: productId,
                
            }
        );

        const userObj = await UserModel.findById(userId);

        userObj.bookings.push(bookingObj['_id']);
        await userObj.save();

        const amount = bookingObj.priceAtThat;
        const currency = 'INR';
        const payment_capture = 1;

        let options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: currency,
            receipt: shortid.generate(),
            payment_capture: payment_capture
        };

        const orderObj = await razorpayInstance.orders.create(options);
        console.log(orderObj);

        bookingObj.orderId = orderObj.id;
        await bookingObj.save();

        res.status(200).json({
            status: "success",
            message: "Your order has been placed",
            data: {
                id: orderObj.id,
                currency: orderObj.currency,
                receipt: orderObj.receipt,
                amount: orderObj.amount
            }
        });
    }catch(error) {
       next(error)
    }
};

BookingRouter.post('/:productId', protectRouteMiddleWare, initiliazeBookingController);

// module.exports = {
//     initiliazeBookingController
// }

module.exports = BookingRouter;

