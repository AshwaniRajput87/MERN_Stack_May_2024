const mongoose = require("mongoose");
// ecommerce -> Amazon 
const bookingSchemaRules = {
    /**
      1. booking time
      2. priceAtThat
      3. status
      4. user
      5. product
      6. orderId
     */

     // A particular collection data or document takes around 16MB

    bookedAt: {
        type: Date,
        default: Date.now()
    },

    priceAtThat: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'failure', 'success']
    },

    userId: {
       type: [mongoose.Schema.ObjectId],
       required: true,
       ref: 'UserModel'
    },

    productId:{
        type: [mongoose.Schema.ObjectId],
        required:true,
        ref: 'ProductModel'
    },

    orderId: {
        type: String
    }
};

const bookingSchema = new mongoose.Schema(bookingSchemaRules);

const BookingModel = mongoose.model("BookingModel", bookingSchema);
module.exports = BookingModel;