const mongoose = require('mongoose');
const productshema = mongoose.Schema(
    {
        subcategoryid: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        deniers: {
            type: String,
            required: true
        },
        filament: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)
const Product = mongoose.model("products", productshema);

module.exports = Product;