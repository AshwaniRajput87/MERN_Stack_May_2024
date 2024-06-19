const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const JWT = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const UserModel = require('./models/userModel');
const otpGenerator = require('./utils/otpGenerator');
const sendEmailHelper = require('./emails/dynamicEmailSender');

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

const forgotPassword = async(req, res, next) =>{
    // 1. user will on click on the forgot password link
    // 2. provide email address where you will recieve the OTP
    // 3. generate the otp and send to email user and persist the otp in the user collection of mongoDB

    try {

        const { email } = req.body;

        const user = await UserModel.findOne({email});

        if(!user) {
            return res.status(404).json({
                status: "failure",
                message: "No such user found!"
            })
        }

        const otp = otpGenerator();

        await sendEmailHelper(otp, user.name, email);

        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000;

        await user.save();

        return res.status(200).json({
            status: "success",
            message: "OTP has been sent to your email",
            otp: otp,
            userId: user.id
        })
        
    } catch (error) {
        next(error);
    }

}

const resetPassword = async(req, res, next) => {
    // user has to send their token/otp and their password
    // verify whether the token/otp is expired or not
    // update the password  for that user in the mongoDB collections

    try {

        const userId = req.params.id;

        const { otp, password, confirmPassword } = req.body;

        const user = await UserModel.findById(userId);

        if(!user) {
            return res.status(404).json({
                status: "failure",
                message: "No such user found!"
            })
        }

        if(otp && otp === user.otp) {
            let currentTime = Date.now();
            console.log(currentTime < user.otpExpiry);

            if(currentTime < user.otpExpiry) {
                user.password = password;
                user.confirmPassword = confirmPassword;
                user.otp = null;
                user.otpExpiry = null;

                // delete user.otp;
                // delete user.otpExpiry;

                await user.save();

                return res.status(200).json({
                    status: "success",
                    message: "Password has been set successfully!"
                })
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: "OTP has been expired!"
                })
            }
        }
    } catch (error) {
        next(error);
    }
}

const validUsers = ['admin', 'seller'];

const isAdminMiddleWare = (allowedUsers) => {

    return async(req, res, next) =>{
        try {

            const id = req.userId;

            const user = await UserModel.findById(id);

            const isAuthorised = allowedUsers.includes(user.role);

            if(isAuthorised) {
                console.log('Authorised User');
                next();
            } else {
                return res.status(401).json({
                    status: "failure",
                    message: "User is not authorised"
                })
            }
        } catch (error) {
            next(error);
        }
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

app.post('/api/auth/signup', signupController);
app.use('/api/auth/login', loginController);
app.use('/api/auth/userProfile', protectRouteMiddleware, getUserProfileDetails);
// app.get('/api/user/payment', protectRouteMiddleware, userTransactionDetails)
app.use('/api/auth/logout', logoutController);
app.use('/api/auth/forgotPassword', forgotPassword);
app.use('/api/auth/resetPassword/:id', resetPassword);
app.use('/api/auth/getAllUsers', protectRouteMiddleware, isAdminMiddleWare(validUsers), getAllUsers)


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