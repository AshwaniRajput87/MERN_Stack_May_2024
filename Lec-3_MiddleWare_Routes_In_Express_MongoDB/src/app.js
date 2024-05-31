const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoute');
// const productRoutes = require('./routes/productRoute');

dotenv.config();

const { PORT, hostname, username, password } = process.env;

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// hitting delete end point -> /api/users/1

const dbURL = `mongodb+srv://${username}:${password}@cluster0.jdq8n60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURL).then((connection)=>{
    console.log('Mongodb is connected', connection);
})






// app.use((req, res, next)=>{
//     console.log("I am in app.use() function");
//     next();
// });

// app.post('/api/user', (req, res)=> {

//     const { name } = req.body;

//     console.log(name);
//     console.log('I am inside the post method');
//     res.status(200).json({
//         status:"success",
//         message:"got the post data",
//         data: {
//             name
//         }
//     });
// });

// app.delete('/api/user/:id', (req, res)=> {

//     const {id} = req.params;
//     console.log(id);

// });


app.listen(PORT, hostname, ()=>{
    console.log(`Server is up and running on http://${hostname}:${PORT}`)
})