// Factory functions that will take the model as input and the function will return the async function that you defined earlier.

const createFactory = (Model) => {
    return async(req, res, next)=> {
        try{
            let elementModel =  await Model.create(req.body);

            if(!elementModel) {
                return res.status(404).json({
                    status: "failure",
                    message: "Data is not pushed successfully!!!"
                })

            }

            res.status(200).json({
                status: "success",
                data: elementModel
            })

        }catch(error){
            // res.status(500).json({
            //     status: "failure",
            //     message: error.message
            // })
            // console.log(error)
            next(error);
        }
    }
}

const getAllFactory = (Model) =>{
    return async(req, res, next)=>{
        try {
            res.setHeader('Content-Type', 'application/json');

            const elementModel = await Model.find();

            res.status(200).json({
                status: "success",
                data: {
                    elementModel
                }
            });
        } catch (error) {

            // res.status(500).json({
            //     status: "failure",
            //     message: "Internal Server Errror"
            // })
            // console.log(error);
            next(error);
        }
    }
}

const getByIdFactory = (Model) =>{
    return async(req, res, next)=>{
        try {
            res.setHeader('Content-Type', 'application/json');

           const { id } = req.params;

            const elementModel = await Model.findById(id);

            res.status(200).json({
                status: "success",
                data: {
                    elementModel
                }
            });
        } catch (err) {

            // res.status(500).json({
            //     status: "failure",
            //     message: "Internal Server Errror"
            // })
            // console.log(error);
            // const error = 'Internal Server Erorr';
            next(err);
        }
    }
}

// const updateFactory = async(req, res)=>{

// }

// const deleteFactory = async(req, res) =>{

// }

module.exports = {
    createFactory,
    getAllFactory,
    getByIdFactory,
    // updateFactory,
    // deleteFactory
}

