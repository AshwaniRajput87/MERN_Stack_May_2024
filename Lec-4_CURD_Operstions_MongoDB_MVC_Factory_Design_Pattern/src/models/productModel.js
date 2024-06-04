  const mongoose = require('mongoose');

  const productSchemaObj = {

    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name must be unique'],
        maxlength: [40, 'Product name should be less than 40 charaters']
    },

    price: {
        type: Number,
        required: [true, 'Product price is required'],
        validate: function() {
            return this.price > 0;
        },
        message: "Price must be greater than 0"
    },

    categories: {
        type: [String],
        required: true,
    },

    description: {
        type: String,
        required: true,
        maxlength: [400, 'Product description text must be less than 400 characters']

    },

    // product is of price 200, discount price 300
    discount: {
        type: Number,
        validate: function(){
            return this.discount < this.price
        },
        message: "Product price must be greater than the discount price"
    },

    averageRating: {
        type: Number
    }
  };


  const productSchema = new mongoose.Schema(productSchemaObj);

  const ProductModel = mongoose.model("productmodel", productSchema);

  module.exports = ProductModel;