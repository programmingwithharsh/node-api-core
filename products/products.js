const express = require("express");
const cors = require('cors'); // for cors issue
require("../db/db");
const Product = require("./Product");

const app = express();
const port = 5000;
app.use(cors()); // for cors issue
app.use(express.json());

// GET API, to display Hello Message
app.get('/', function (req, res) {
    res.send('Hello World');
})

// GET API, return all products
app.get('/products', function (req, res) {
    Product.find().then((products) => {
        if (products) {
            res.json(products);
        } else {
            res.status(404).send('products not found');
        }
    }).catch((err) => {
        res.status(500).send("Internal Server Error!");
    })
})

// GET API, return product based on ID
app.get('/product/:id', function (req, res) {
    Product.findById(req.params.id).then((product) => {
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('products not found');
        }
    }).catch((err) => {
        res.status(500).send("Internal Server Error!");
    })
})

// POST API, to add new product
app.post('/product', function (req, res) {
    const newProduct = new Product({ ...req.body });
    newProduct.save().then(() => {
        res.send('New Product Created Successfully');
    }).catch((err) => {
        res.status(500).send("Internal Server Error!");
    })
})

// GET API, return product based on ID
app.delete('/product/:id', function (req, res) {
    Product.findByIdAndDelete(req.params.id).then((product) => {
        if (product) {
            res.json('Product deleted successfully');
        } else {
            res.status(404).send('products not found');
        }
    }).catch((err) => {
        res.status(500).send("Internal Server Error!");
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})