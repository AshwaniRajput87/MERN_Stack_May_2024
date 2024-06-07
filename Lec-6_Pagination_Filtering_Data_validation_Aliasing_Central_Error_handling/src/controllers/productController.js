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

const tranformQueryHelper = (myQuery) => {

    const parseQuery = JSON.parse(myQuery);

    const queryOperators = {
        gt: '$gt',
        lt: '$lt',
        lte: '$lte',
        gte: '$gte'
    }

    for(let key in  parseQuery) { //{"price": {"lte": 100000}}

        const internalObj =  parseQuery[key]; // {"lte": 100000}

        if(typeof internalObj === 'object') {
            for(let innerKey in internalObj) { // "lte" -> "$lte"

                if(queryOperators[innerKey]){ // lte belongs to queryOperators object
                 internalObj[`$${innerKey}`] = internalObj[innerKey];
                 // {$lte: 100000}
                 delete internalObj[innerKey];
                }

            }
        }
    }

    return  parseQuery;

}

const getTop5Products = async(req, res, next) => {

    // stock <= 5
    // averageRating > 4.5
    console.log(req.query);
    req.query.filter = JSON.stringify({
        stock: {$lte: 5},
        averageRating: {$gt: 4.5},
        price: {$gte: 38000}
    });

    next();

}

const getProductCategories = (req, res) => {
    res.status(200).json(['electronics','jewelery', 'mens clothing', 'womens clothing']
    )
}

const getProductHandler = async(req, res, next) =>{

    try{

        const query = req.query;
        const sortParams = query.sort;
        const selectParams = query.select;
        const filterParams = query.filter;
        const page = query.page || 1;
        const limit = query.limit || 3;
        const skip = (page-1) * limit; // (1-1)*3 = 0, (2-1)*3 = 3
        console.log(filterParams);

        // Filtering the data from mongodb
        // Basic filtering
        let queryPromiseRes = null;
        if(filterParams) {
            // need to tranform this object {"price": {"lte": 100000}} to {price: {$lte: 100000}}
            const filterObj = tranformQueryHelper(filterParams);
            console.log(filterObj);

            queryPromiseRes = ProductModel.find(filterObj);
        } else {
            queryPromiseRes = ProductModel.find();
        }
        
        // let queryPromiseRes = ProductModel.find({price: {$gt: 100000}});
        //let queryPromiseRes = ProductModel.find({name: 'Iphone 13'});
        
        // let queryPromiseRes = ProductModel.find({categories: 'electronics'});


        // Advance filtering: granular filtering such chaining expressions
        // let queryPromiseRes = ProductModel.find().where('price').gte(100000);

        // Sorting Impl
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

        // Selecting few mongodb fields Impl
        if(selectParams) {
            console.log(selectParams);
            queryPromiseRes = queryPromiseRes.select(selectParams);
        }

        // pagination Impl
        queryPromiseRes = queryPromiseRes.skip(skip).limit(limit);

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
    getTop5Products,
    getProductHandler,
    getProductCategories
}