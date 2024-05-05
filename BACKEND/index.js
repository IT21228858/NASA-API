import cors from 'cors'; //  import cors
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute.js';
import authRoute  from './Routes/authRoute.js';
import cookieParser from 'cookie-parser';


dotenv.config();
mongoose.connect(
   process.env.MONGO
)
.then(() =>{
    console.log("MongoDB is connected");

})
.catch((err) => {
    console.log(err);

});
const app = express();
// Allow requests from specific origin(s)
//backend will not approve requests from frontend without this 
app.use(cors({
    origin: 'https://nasa-api-app-dulhan.netlify.app'
  }));
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () =>{
    console.log("Server is running on port 3000!!")
});
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Ooops,internal server error!!...';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});