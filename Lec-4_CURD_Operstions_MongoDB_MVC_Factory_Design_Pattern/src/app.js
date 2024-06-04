const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');

dotenv.config();

const { PORT, hostname, username, password } = process.env;

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const dbURL = `mongodb+srv://${username}:${password}@cluster0.jdq8n60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURL).then((connection)=>{
    console.log('Mongodb is connected');
})


app.listen(PORT, hostname, ()=>{
    console.log(`Server is up and running on http://${hostname}:${PORT}`)
})