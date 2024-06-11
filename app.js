const express = require('express');
const app = express();

const connection = require('./config/connection');
const categoryroutes = require('./routes/category');
const subcategoryroutes = require('./routes/subcategory');
const productroutes = require('./routes/product');

app.use(express.json());

app.use('/category', categoryroutes);
app.use('/subcategory', subcategoryroutes);
app.use('/product', productroutes);

connection().then(() => { console.log("connection successfully") });
app.listen(process.env.PORT, () => { console.log("port connected") });