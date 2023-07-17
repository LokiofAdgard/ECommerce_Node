const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Router = require('./routes/productRoutes')

app.use(express.json())
app.use('/', Router);

mongoose.connect('mongodb+srv://admin:admin@cluster0.lfqrsro.mongodb.net/NodeAPI?retryWrites=true&w=majority').then(() => {
    console.log("Connected to MongoDB")
    app.listen(3000, ()=>{
        console.log('Node API running on port 3000')
    })
}).catch(() => {
    console.log("Error")
})