const express = require('express');
const categoryroutes = express.Router();
const categoryimg = require('../middleware/categoryimg');
const {
    InsertCategory,
    UpadateCategory,
    GetSingleCategory,
    DeleteCategory } = require('../controllars/category');

categoryroutes.post('/', categoryimg.single('categoryimgname'), InsertCategory)
categoryroutes.patch('/:id', categoryimg.single('categoryimgname'), UpadateCategory)
categoryroutes.get('/:id', GetSingleCategory)
categoryroutes.delete('/:id', DeleteCategory)

module.exports = categoryroutes;