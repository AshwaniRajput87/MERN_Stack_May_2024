const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const JWT = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const UserModel = require('./models/userModel');

dotenv.config();

const { PORT, hostname, username, password, SECRET_KEY } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieparser());

// sending cookie from server and make it as httpOnly
app.use('/products', (req, res)=>{

    // console.log('cookie name', req.cookies);

    const { pageVisited } = req.cookies;
    console.log(pageVisited);

    res.cookie('pageVisited', 'home', {
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1yrs (maxAge always in milliseconds that why multilplied by 1000)
        httpOnly: true,
    })

    res.json({
        status: "success",
        message: `Welcome to this ${pageVisited}!`
    })
});

// how can you clear cookie
app.get('/clearCookie', (req, res)=>{
    res.clearCookie('pageVisited');

    res.json({
        status: "success",
        message: "Cookie has been cleared now!"
    })
});


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
//app.use('/api/auth', authRoutes);

//const payload = {name: "Ashwani Rajput"};

// app.get('/signup', (req, res)=> {

//     try {

//        JWT.sign({data: payload}, SECRET_KEY, {algorithm: 'HS512'}, (err, data) => {

//             if(err) {
//                 console.log(err);
//                 throw new Error(err);
//             }

//             res.cookie('token', data, {
//                 maxAge: 30 * 60 * 60 * 1000,
//                 httpOnly: true
//             });

//             res.json({
//                 authToken: data
//             });
//        });

        
//     } catch (error) {
//     //  res.json({
//     //     status: "failure",
//     //     message: "Internal Server Error"
//     //  })
//     next(error)
//     }
// })

// app.get('/verify', (req, res)=>{
//     try {

//         const { token } = req.cookies;
//         console.log(token);

//         const decodedToken = JWT.verify(token, SECRET_KEY);

//         res.json({
//             message: 'token is decoded',
//             decodedToken
//         })
        
//     } catch (error) {
//         next(error);
//     }
// })

const signupController = async(req, res, next) => {
    const userObj = req.body;

    try{
        if(userObj) {
            let newUser = await UserModel.create(userObj);

            res.status(200).json({
                status: "success",
                message: "User has been regitered successfully"

            });
        }
    }catch(err){
        next(err);
    }
}

const loginController = async(req, res, next) => {

    const { email, password} =   req.body;

    const user = await UserModel.findOne({email});

    console.log(user);

    if(!user) {
        res.status(404).json({
            status:"failure",
            message: "USer not found"
        })
    }

    const isPwdSame = password === user.password;

    console.log(isPwdSame);

    try {

        if(isPwdSame){

            JWT.sign({id: user['_id']}, SECRET_KEY, {algorithm: 'HS512'}, (err, data) => {

                if(err) {
                    console.log(err);
                    throw new Error(err);
                }

                res.cookie('token', data, {
                    maxAge: 30 * 60 * 60 * 1000,
                    httpOnly: true
                });

                res.json({
                    status: "success",
                    message: "You have successfully loggedin"
                });
            });
        }
        
    } catch (error) {
        next(error);   
    }
}

const protectRouteMiddleware = (req, res, next) => {

    try {

        const { token } = req.cookies;

        const decodedToken = JWT.verify(token, SECRET_KEY);

        if(decodedToken) {
            const userId = decodedToken.id;
            req.userId = userId;
            next();
        }
        
    } catch (error) {
        next(error);
    }

}

const getUserProfileDetails = async(req, res, next) => {

    const id = req.userId; 

    const userDetails =  await UserModel.findById(id);

    const { email, name } = userDetails;
    res.status(200).json({
        status: "success",
        message: "User data fetched successfully",
        user: {
            name,
            email
        }
    });
}

const logoutController = async(req, res, next) => {
   res.clearCookie('token');
   res.status(200).json({
        status: "success",
        message: "User has been successfully logout"
   })
}

app.post('/api/auth/signup', signupController);
app.use('/api/auth/login', loginController);
app.use('/api/auth/userProfile', protectRouteMiddleware, getUserProfileDetails);
// app.get('/api/user/payment', protectRouteMiddleware, userTransactionDetails)
app.use('/api/auth/logout', logoutController);


// Assignment: Integrate the these end points with Emcommerce frontend project:
// 1. create a signup form and integrate the signup API
// 2. create login form and integrate the login API
// 3. get the user details after integrating the getUserProfile API
// 4. create a logout button and after clicking on that button integrate the logout API.



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
});

const dbURL = `mongodb+srv://${username}:${password}@cluster0.jdq8n60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURL).then((connection)=>{
    console.log('Mongodb is connected');
});

app.listen(PORT, hostname, ()=>{
    console.log(`Server is up and running on http://${hostname}:${PORT}`)
})