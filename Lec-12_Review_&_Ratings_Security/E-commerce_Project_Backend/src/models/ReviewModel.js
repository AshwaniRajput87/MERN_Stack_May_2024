const mongoose = require('mongoose');

const reviewSchemaRules = {
   // Do Implementation here
   /**
      1. review
      2. rating
      3. createdAt
      4. user
      5. product
   */

   review: {
      type: String,
      required: true
   },

   rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
   },

   createdAt: {
      type: Date,
      default: Date.now()
   },

   user:{
      type: [mongoose.Schema.ObjectId],
      required: true,
      ref: "UserModel"
   },

   product: {
      type: [mongoose.Schema.ObjectId],
      required: true,
      ref: "ProductModel"
   }
};

const reviewSchema = new mongoose.Schema(reviewSchemaRules);

const reviewModel = new mongoose.model('ReviewModel', reviewSchema);

module.exports = reviewModel;