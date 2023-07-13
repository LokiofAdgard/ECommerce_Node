const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./Models/productModels')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Node API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blogger')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch(e) {
        res.status(500).json({message: e.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch(e) {
        res.status(500).json({message: e.message})
    }
})

app.post('/products', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch(e) {
        console.log(e.message)
        res.status(500).json({message: e.message})
    }
})

app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: 'Cannot find Product'})
        }
        const newProduct = await Product.findById(id);
        res.status(200).json(newProduct);
    } catch(e) {
        res.status(500).json({message: e.message})
    }
})

app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'Cannot find Product'})
        }
        res.status(200).json(product);
    } catch(e) {
        res.status(500).json({message: e.message})
    }
})

mongoose.connect('mongodb+srv://admin:admin@cluster0.lfqrsro.mongodb.net/NodeAPI?retryWrites=true&w=majority').then(() => {
    console.log("Connected to MongoDB")
    app.listen(3000, ()=>{
        console.log('Node API running on port 3000')
    })

}).catch(() => {
    console.log("Error")
})