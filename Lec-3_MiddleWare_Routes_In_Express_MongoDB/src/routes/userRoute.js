const express = require('express');

const app = express();

app.use(express.json()); // express.json(): if want to get the json data from request body

const router = express.Router();

// Performing the CURD operations (in-memory)
const users = [
    {id: 1, name:'Ashwani'},
    {id: 2, name:'Pavan'},
    {id: 3, name:'Vaibhav'},
    {id: 4, name:'Khusiram'},
    {id: 5, name:'Jasil'},
]

router.get('/', (req, res)=>{
    try {
        res.setHeader('Content-Type', 'application/json');
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
});

router.get('/:id', (req, res)=>{

    try{
         res.setHeader('Content-Type', 'application/json');
         const { id } = req.params;

         const userId = parseInt(id);
         console.log(userId);

         const user = users.find((user)=>{ // user => user.id === userId
            return user.id === userId
         });

         console.log(user);

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

})

router.post('/', (req, res)=>{
    try{

        const {name} = req.body;

        if(!name && !name.length) {
            return res.status(400).json({
                error: 'Name is required'
            })
        }

        const id = users.length + 1;
        const newUser = {id, name};
        users.push(newUser);

        res.status(200).json({
            status: "success",
            data: newUser
        })

    }catch(error){
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }

});

// Assigments: complete the put and delete operations
router.put('/:id', (req, res)=>{

});

router.delete('/:id', (req, res)=>{

});

   /**
    * problem: 
    *   1. data is persisting in-memory (thata means data can flush out automatically if server gets killed and then re-start)
    *  Solution:
        - Persist the data permamnently using database
          
    */

module.exports = router;