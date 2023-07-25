const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
    {
        owner: {
            type: String,
            required: true,
            unique: true
        },
        products: {
            type: Array
        },
        placed: {
            type: Boolean,
            default: false
        }
    }
)


const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;