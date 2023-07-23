const Product = require('../models/productModels')

class ProductController {
    getAllProducts = async (req, res, next) => {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch(e) {
            res.status(500).json({message: e.message})
        }
    };

    getByID = async (req, res, next) => {
        try {
            const {id} = req.params;
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch(e) {
            res.status(500).json({message: e.message})
        }
    };

    getByPrice = async(req, res) => {
        try {
            const {n} = req.params;
            const product = await Product.find({ name: n });
            res.status(200).json(product);
        } catch(e) {
            res.status(500).json({message: e.message})
        }
    };

    addProduct = async(req, res) => {
        try{
            const product = await Product.create(req.body)
            res.status(200).json(product)
        } catch(e) {
            console.log(e.message)
            res.status(500).json({message: e.message})
        }
    };

    updateProduct = async(req, res) => {
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
    };

    deleteProduct = async(req, res) => {
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
    };
}

module.exports = new ProductController;