const UserModel = require("../models/userModel");

// Performing the CURD operations in mongodb
const createUser = async(req, res)=>{
    try{

        let user =  await UserModel.create(req.body);

        if(!user) {
            return res.status(404).json({
               status: "failure",
               message: "You couldn't registered successfully"
            })
        }

        res.status(200).json({
            status: "success",
            data: user
        })

    }catch(error){
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
}

const getAllUsers = async(req, res)=>{
    try {
        res.setHeader('Content-Type', 'application/json');

        const users = await UserModel.find();

        res.status(200).json({
            status: "success",
            data: {
                users
            }
        });
    } catch (error) {

        res.status(500).json({
            status: "failure",
            message: "Internal Server Errror"
        })
    }
}

const getUserById =  async(req, res)=>{
    try{
         res.setHeader('Content-Type', 'application/json');
         const { id } = req.params;

         const user = await UserModel.findById(id);

         if(!user) {
            res.status(404).json({
                status: "failure",
                message: "User not found"
            })
         }
         res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch(err) {
        res.status(500).json({
            status: "failure",
            message: "Internal Server Errror"
        })
    }
}


// Assigments: complete the put and delete operations
const updateUser = async(req, res)=>{

}

const deleteUser = async(req, res) =>{

}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}