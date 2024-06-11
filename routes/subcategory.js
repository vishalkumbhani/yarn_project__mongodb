const express = require('express');
const subcategoryroutes = express.Router();
const {
    InsertSubCategory,
    UpadateSubCategory,
    GetSingleSubCategory,
    GetAllSubCategory,
    DeleteSubCategory } = require('../controllars/subcategory');

subcategoryroutes.post('/', InsertSubCategory)
subcategoryroutes.patch('/:id', UpadateSubCategory)
subcategoryroutes.get('/:id', GetSingleSubCategory)
subcategoryroutes.get('/', GetAllSubCategory)
subcategoryroutes.delete('/:id', DeleteSubCategory)

module.exports = subcategoryroutes;