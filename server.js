const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
require('dotenv').config();

app.use(express.json())
app.use('/', productRouter);
app.use('/', userRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB")
    app.listen(3000, ()=>{
        console.log('Node API running on port 3000')
    })
}).catch(() => {
    console.log("Error")
})