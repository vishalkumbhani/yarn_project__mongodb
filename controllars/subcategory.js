const Subcategory = require('../model/subcategory');
const Category = require('../model/category');
const ObjectId = require('objectid');

const InsertSubCategory = async (req, res) => {
    try {
        const data = req.body;
        if (!data.categoryid || !data.subcategoryname) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            })
        }

        const result = await Subcategory.create(data);
        res.status(201).json({
            status: true,
            message: "Subcategory inserted successfully"
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const UpadateSubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(400).json({
                status: false,
                message: "Subcategory not found"
            })
        }

        const data = req.body;
        const result = await Subcategory.updateOne({ _id: id }, { $set: data });
        res.status(200).json({
            status: true,
            message: "Subcategory updated successfully"
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetSingleSubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(400).json({
                status: false,
                message: "Subcategory not found"
            })
        }

        const category = await Category.findOne({ _id: subcategory.categoryid })
        const obj = { ...subcategory.toObject(), category: category.categoryname }
        res.status(400).json({
            status: true,
            message: "Data found",
            result: obj
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetAllSubCategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.find({});
        const subcategorywisecategory = [];

        for (const obj of subcategory) {

            const maincategory = await Category.findOne({ _id: obj.categoryid });
            const subcategorywithcategory = { ...obj.toObject(), category: maincategory.categoryname }
            subcategorywisecategory.push(subcategorywithcategory);
        }
        res.status(200).json({
            status: true,
            message: "All data found",
            data: subcategorywisecategory
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: "sss" + err.message
        })
    }
}

const DeleteSubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(400).json({
                status: false,
                message: "Subcategory not found"
            })
        }

        const result = await Subcategory.deleteOne({ _id: id });
        res.status(200).json({
            status: true,
            message: "Subcategory deleted successfully"
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
    InsertSubCategory,
    UpadateSubCategory,
    GetSingleSubCategory,
    GetAllSubCategory,
    DeleteSubCategory
}
