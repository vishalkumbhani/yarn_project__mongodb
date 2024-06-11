const Category = require('../model/category');
const ObjectId = require('objectid');

const InsertCategory = async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;

        if (!data.categoryname) {
            return res.status(400).json({
                status: false,
                message: "Please add categoryname"
            })
        }

        if (!file) {
            return res.status(400).json({
                status: false,
                message: "Please add categoryimage"
            })
        }

        const imgname = file.filename;
        const obj = { ...data, categoryimgname: imgname }
        const result = await Category.create(obj);
        res.status(201).json({
            status: true,
            message: "Category inserted successfully"
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const UpadateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const file = req.file;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(400).json({
                status: false,
                message: "category not found"
            })
        }

        if (!file) {
            const result = await Category.updateOne({ _id: id }, { $set: data })
            return res.status(200).json({
                status: true,
                message: "Category updated successfully"
            })
        }

        const imagename = file.filename;
        const obj = { ...data, categoryimgname: imagename }
        const result = await Category.updateOne({ _id: id }, { $set: obj })
        res.status(200).json({
            status: true,
            message: "Category updated successfully"
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetSingleCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(400).json({
                status: false,
                message: "category not found"
            })
        }

        const result = await Category.findById(id);
        res.status(200).json({
            status: true,
            message: "Category get",
            data: result
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const DeleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(400).json({
                status: false,
                message: "category not found"
            })
        }

        const result = await Category.deleteOne({ _id: id });
        res.status(200).json({
            status: true,
            message: "Category deleted successfully",
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
    InsertCategory,
    UpadateCategory,
    GetSingleCategory,
    DeleteCategory
}
