const express = require('express');

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const app = express();

app.use(express.json()); // express.json(): if want to get the json data from request body

const router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;