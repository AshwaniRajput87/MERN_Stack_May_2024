const express = require("express");
const ReviewRouter = express.Router();
const ReviewModel = require("../models/ReviewModel");
const { protectRouteMiddleWare } = require("../controllers/AuthController");
const ProductModel = require("../models/ProductModel");

const createReviewController = async(req, res) =>{
    try {
        // do implementation 
        // give a particular rating to a product with review
        // calculate avg rating as well
        // push that review data in the productModel

        const { review, rating } = req.body;
        const { productId } = req.params; // {productId: chsa2778e}
        const userId = req.userId;

        const reviewObj = await ReviewModel.create({
            review,
            rating,
            product: productId,
            user: userId
        });

        const productObj = await ProductModel.findById(productId);
        const averageRating = productObj.averageRating;

        console.log(productObj);

        if(averageRating){
            console.log(averageRating); // 5 * 2
            let sum = averageRating * productObj.reviews.length;
            console.log(sum);
            let finalAvgRating = (sum + reviewObj.rating)/(productObj.reviews.length + 1);
            console.log(finalAvgRating);

            productObj.averageRating = finalAvgRating;
         
        } else {
            productObj.averageRating = reviewObj.rating;
        }

        productObj.reviews.push(reviewObj['_id']);
        await productObj.save();
        console.log(reviewObj);

        res.status(200).json({
            status: "success",
            data: reviewObj
        })

    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

const getAllReviewForAProductController = async(req, res)  => {
    try {
        // Get the product ID from the request parameters or query string
       
    } catch (err) {
        // Handle errors
        res.status(500).json({
            status: "failure",
            message: err.message
        });
    }
}

ReviewRouter.post("/:productId", protectRouteMiddleWare, createReviewController);

ReviewRouter.get("/:productId", getAllReviewForAProductController);

module.exports = ReviewRouter;