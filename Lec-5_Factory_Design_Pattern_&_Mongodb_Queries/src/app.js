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

// Central Error handler.
//https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling

// About ESLint: https://eslint.org/docs/latest/use/getting-started
app.use((err, req, res, next)=>{// es-lint disabled
    // console.log(err);
    const statusCode = err.statusCode || 500;
    const errMsg = err.message || 'Internal Server Error'
    res.json({
        status: statusCode,
        message: errMsg
    })
})

app.use('/search', (req, res)=>{
    const query = req.query;
    console.log(req.query);

    res.status(200).json({
        status: 200,
        data: query
    })

})

const dbURL = `mongodb+srv://${username}:${password}@cluster0.jdq8n60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURL).then((connection)=>{
    console.log('Mongodb is connected');
});

app.listen(PORT, hostname, ()=>{
    console.log(`Server is up and running on http://${hostname}:${PORT}`)
})