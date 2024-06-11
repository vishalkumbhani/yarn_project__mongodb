const Product = require('../model/product');
const Subcategory = require('../model/subcategory');
const Category = require('../model/category');
const ObjectId = require('objectid');

const InsertProduct = async (req, res) => {
    try {
        const data = req.body;
        if (!data.subcategoryid || !data.company || !data.price || !data.deniers || !data.filament) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            })
        }

        const result = await Product.create(data);
        res.status(201).json({
            status: true,
            message: "Product inserted successfully"
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const UpdateProduct = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                status: false,
                message: "Product not found"
            })
        }

        const result = await Product.updateOne({ _id: id }, { $set: data });
        res.status(200).json({
            status: true,
            message: "Producut updated successfully"
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                status: false,
                message: "Product not found"
            })
        }

        const subcategory = await Subcategory.findOne({ _id: product.subcategoryid });
        const category = await Category.findOne({ _id: subcategory.categoryid });
        const obj = { ...product.toObject(), category: category.categoryname, subcategory: subcategory.subcategoryname }

        res.status(200).json({
            status: true,
            message: "Data found",
            data: obj
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetAllProduct = async (req, res) => {
    try {
        const product = await Product.find({});
        const productwithcategory = [];

        for (const row of product) {

            const subcategory = await Subcategory.findOne({ _id: row.subcategoryid });
            const category = await Category.findOne({ _id: subcategory.categoryid });
            const obj = { ...row.toObject(), category: category.categoryname, subcategory: subcategory.subcategoryname }
            productwithcategory.push(obj)
        }

        res.status(200).json({
            status: true,
            message: "All data found",
            data: productwithcategory
        })


    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const DeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                status: false,
                message: "Product not found"
            })
        }

        const result = await Product.deleteOne({ _id: id })
        res.status(200).json({
            status: true,
            message: "Producut deleted successfully"
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

module.exports = {
    InsertProduct,
    UpdateProduct,
    GetSingleProduct,
    GetAllProduct,
    DeleteProduct
}