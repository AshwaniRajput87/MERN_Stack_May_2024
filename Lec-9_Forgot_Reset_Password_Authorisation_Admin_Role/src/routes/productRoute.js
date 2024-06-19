const express = require('express');

const {
    createProduct,
    getAllProducts,
    getProductById,
    getProductHandler,
    // updateProduct,
    // deleteProduct,
    getTop5Products,
    getProductCategories
} = require('../controllers/productController');

const app = express();

app.use(express.json()); // express.json(): if want to get the json data from request body

const router = express.Router();

router.get('/categories', getProductCategories)

router.post('/', createProduct);

router.get('/', getProductHandler);

router.get('/bigBillionDay', getTop5Products, getProductHandler);

router.get('/:id', getProductById);


// router.put('/:id', updateProduct);

// router.delete('/:id', deleteProduct);

module.exports = router;