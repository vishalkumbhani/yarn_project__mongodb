const mongoose = require('mongoose');

const categoryschema = mongoose.Schema(
    {
        categoryname: {
            type: String,
            required: true
        },
        categoryimgname: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)
const Category = mongoose.model("categorys", categoryschema);

module.exports = Category;