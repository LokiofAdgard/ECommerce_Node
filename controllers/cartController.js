const Cart = require('../models/cartModel');
const User = require('../models/userModel');

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
            const user = await Cart.create(req.body)
            res.status(200).json(user)
        } catch(e) {
            console.log(e.message)
            res.status(500).json({message: e.message})
        }
    };

    placeCart = async(req, res) => {
        try {
            const cart = await Cart.findOneAndUpdate({owner: 'Johnathan'}, {placed: true});
            if(!cart){
                return res.status(404).json({message: 'Cannot find Product'})
            }
            const newCart = await Cart.findById(id);
            res.status(200).json(newCart);
        } catch(e) {
            res.status(500).json({message: e.message})
        }
    };

    addToCart = async(req, res) => {
        try {
            const query = { owner:req.body.owner, "products.product": req.body.product };
            const updateDocument = {$inc: { "products.$.quantity": req.body.quantity }};
            const result = await Cart.updateOne(query, updateDocument);

            if(result.modifiedCount==0){
                console.log('here')
                const result2 = await Cart.updateOne({ owner:req.body.owner }, {
                    $push: {
                        products: {product:req.body.product, quantity:req.body.quantity}
                    }
                });
            }

            res.status(200).json(result);
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
}

module.exports = new cartController;