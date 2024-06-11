const mongoose = require('mongoose');

const subcategoryschema = mongoose.Schema(
    {
        categoryid: {
            type: String,
            required: true
        },
        subcategoryname: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)
const Subcategory = mongoose.model("subcategorys", subcategoryschema);

module.exports = Subcategory;