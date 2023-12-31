const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter product name"]
        },
        author: {
            type: String,
            required: [true, "Please Enter product name"]
        },
        quantity: {
            type: Number,
            required: [true, "Please Enter product number"],
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)


const Product = mongoose.model('Product', productSchema);
module.exports = Product;