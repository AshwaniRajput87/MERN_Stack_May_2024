const mongoose = require("mongoose");
// ecommerce -> Amazon 
// const productSchemaRules = {
//     name: {
//         type: String,
//         // error handling 
//         required: [true, "kindly pass the name"],
//         unique: [true, "product name should be unique"],
//         maxlength: [40, "Your product length is more than 40 characters"],
//     },
//     price: {
//         type: String,
//         required: [true, "kindly pass the price"],
//         validate: {
//             validator: function () {
//                 return this.price > 0;
//             },
//             message: "price can't be negatives"
//         }
//     },
//     categories: {
//         type: String,
//         required: true
//     },
//     productImages: {
//         type: [String]
//     },
//     averageRating: Number,
//     discount: {
//         type: Number,
//         validate: {
//             validator: function () {
//                 return this.discount < this.price;
//             },
//             message: "Discount must be less than actual price",
//         },
//     },
// }
const newProductSchemaRules = {
    name: {
        type: String,
        // error handling 
        required: [true, "kindly pass the name"],
        unique: [true, "product name should be unique"],
        maxlength: [40, "Your product length is more than 40 characters"],
    },
    brand: {
        type: String,
        required: [true, "Please Enter The brand name"],

    },
    price: {
        type: String,
        required: [true, "kindly pass the price"],
        validate: {
            validator: function () {
                return this.price > 0;
            },
            message: "price can't be negatives"
        }
    },
    categories: {
        type: [String],
        required: true,
    },
    productImages: {
        type: [String]
    },
    averageRating: Number,
    discount: {
        type: Number,
        validate: {
            validator: function () {
                return this.discount < this.price;
            },
            message: "Discount must be less than actual price",
        },
    },
    description: {
        type: String,
        required: [true, "kindly add desc"],
        maxlength: [2000, "description can't be bigger then 2000 characters"]
    },
    stock_quantity: {
        type: String,
        required: [true, "You should enter stock of the product should be atleast 0"],
        validate: function () {
            return this.stock_quantity >= 0;
        },
        message: "stock_quantity should can't be negative "
    },
    reviews: {
         type: [mongoose.Schema.ObjectId],
        required: true,
        ref: "ReviewModel"
    }
}

const productSchema = new mongoose.Schema(newProductSchemaRules);

const ProductModel = mongoose.model("ProductModel", productSchema);
module.exports = ProductModel;