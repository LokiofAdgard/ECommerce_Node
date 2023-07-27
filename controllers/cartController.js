const Cart = require('../models/cartModel');
const Product = require('../models/productModels')

class cartController{

    getAllCarts = async (req, res, next) => {
        try {
            const carts = await Cart.find({});
            res.status(200).json(carts);
        } catch(e) {
            res.status(500).json({message: e.message})
        }
    };

    addCart = async(req, res) => {
        try{
            const cart = await Cart.create(req.body)
            res.status(200).json(cart)
        } catch(e) {
            console.log(e.message)
            res.status(500).json({message: e.message})
        }
    };

    placeCart = async(req, res) => {
        try {
            // console.log(req.body.owner);
            const cart = await Cart.findOneAndUpdate({owner: req.body.owner}, {placed: true});
            if(!cart){
                return res.status(404).json({message: 'Cannot find Product'})
            }
            // const newCart = await Cart.findById(id);
            res.status(200).json({success: true});
        } catch(e) {
            res.status(500).json({message: e.message})
        }
    };

    addToCart = async(req, res) => {
        try {
            const product = await Product.findOne({name:req.body.product});
            if(product.quantity >= req.body.quantity){
                const result0 = await Product.updateOne({name:req.body.product}, {$inc: { quantity: -(req.body.quantity) }});

                const query = { owner:req.body.owner, "products.product": req.body.product };
                const updateDocument = {$inc: { "products.$.quantity": req.body.quantity }};
                const result = await Cart.updateOne(query, updateDocument);

                if(result.modifiedCount==0){
                    const result2 = await Cart.updateOne({ owner:req.body.owner }, {
                        $push: {
                            products: {product:req.body.product, quantity:req.body.quantity, price: req.body.price}
                        }
                    });
                }
                res.status(200).json(result0);
            } else {
                res.status(500).json({success:false, message:'not enough stock'});
            }
        } catch(e) {
            res.status(500).json({message: e.message})
        }
    };

    updateQuantity = async(req, res) => {
        try {
            const query = { owner:req.body.owner, "products.product": req.body.product };
            const updateDocument = { "products.$.quantity": req.body.quantity };
            const result = await Cart.updateOne(query, updateDocument);

            res.status(200).json(result);
        } catch(e) {
            res.status(500).json({message: e.message})
        }
    };

    getCart = async (req, res, next) => {
        try {
            // console.log(req.body);
            const cart = await Cart.findOne({owner: req.body.owner});
            // console.log(cart);
            res.status(200).json(cart.products);
        } catch(e) {
            res.status(500).json({message: e.message})
        }
    };
}

module.exports = new cartController;