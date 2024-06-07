const ProductModel = require("../models/productModel");

const {
    createFactory,
    getAllFactory,
    getByIdFactory,
    // updateFactory,
    // deleteFactory
} = require('../utils/curdFactory');

// Performing the CURD operations in mongodb
// const createProduct = async(req, res)=>{
//     try{

//         console.log(req.body);

//         let product =  await ProductModel.create(req.body);

//         if(!product) {
//             return res.status(404).json({
//                status: "failure",
//                message: "You couldn't create the product successfully"
//             })
//         }

//         res.status(200).json({
//             status: "success",
//             data: product
//         })

//     }catch(error){
//         res.status(500).json({
//             status: "failure",
//             message: error.message
//         })
//     }
// }

// const getAllProducts = async(req, res)=>{
//     try {
//         res.setHeader('Content-Type', 'application/json');

//         const products = await ProductModel.find();

//         res.status(200).json({
//             status: "success",
//             data: {
//                 products
//             }
//         });
//     } catch (error) {

//         res.status(500).json({
//             status: "failure",
//             message: "Internal Server Errror"
//         })
//     }
// }

// const getProductById =  async(req, res)=>{
//     try{
//          res.setHeader('Content-Type', 'application/json');
//          const { id } = req.params;

//          const user = await ProductModel.findById(id);

//          if(!user) {
//             res.status(404).json({
//                 status: "failure",
//                 message: "User not found"
//             })
//          }
//          res.status(200).json({
//             status: "success",
//             data: {
//                 user
//             }
//         })
//     } catch(err) {
//         res.status(500).json({
//             status: "failure",
//             message: "Internal Server Errror"
//         })
//     }
// }


// Assigments: complete the put and delete operations
// const updateProduct = async(req, res)=>{

// }

// const deleteProduct = async(req, res) =>{

// }

const createProduct = createFactory(ProductModel);
const getAllProducts = getAllFactory(ProductModel);
const getProductById = getByIdFactory(ProductModel);
// const updateProduct = updateFactory(ProductModel);
// const deleteProduct = deleteFactory(ProductModel);

const getProductHandler = async(req, res, next) =>{

    try{

        const query = req.query;
        const sortParams = query.sort;
        const selectParams = query.select;
        console.log(query.page);

        // console.log(sortParams);

        let queryPromiseRes = ProductModel.find();

        if(sortParams) {
            // console.log(sortParams.split(" "));
            const [sortParam, order] = sortParams.split(" ");

            console.log(sortParam, order);

            if(order === 'asc') {
                queryPromiseRes = queryPromiseRes.sort(sortParam);
            } else {
                queryPromiseRes = queryPromiseRes.sort(`-${sortParam}`);
            }
        }

        const result = await queryPromiseRes;

        res.status(200).json({
            status: "success",
            data: result
        })
    }catch(error) {
        next(error);
    }

}


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    // updateProduct,
    // deleteProduct,
    getProductHandler
}