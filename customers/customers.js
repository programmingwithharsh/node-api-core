const express = require("express");
const cors = require('cors'); // for cors issue
require("../db/db");
const Customer = require("./Customer");

const app = express();
const port = 5000;
app.use(cors()); // for cors issue
app.use(express.json());

// GET API, to display Hello Message
app.get('/', function (req, res) {
    res.send('Hello World');
})

// GET API, return all customers
app.get('/customers', function (req, res) {
    Customer.find().then((customers) => {
        if (customers) {
            res.json(customers);
        } else {
            res.status(404).send('customers not found');
        }
    }).catch((err) => {
        res.status(500).send("Internal Server Error!");
    })
})

// GET API, return customer based on ID
app.get('/customer/:id', function (req, res) {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).send('customers not found');
        }
    }).catch((err) => {
        res.status(500).send("Internal Server Error!");
    })
})

// POST API, to add new customer
app.post('/customer', function (req, res) {
    const newCustomer = new Customer({ ...req.body });
    newCustomer.save().then(() => {
        res.send('New Customer Created Successfully');
    }).catch((err) => {
        res.status(500).send("Internal Server Error!");
    })
})

// GET API, return customer based on ID
app.delete('/customer/:id', function (req, res) {
    Customer.findByIdAndDelete(req.params.id).then((customer) => {
        if (customer) {
            res.json('Customer deleted successfully');
        } else {
            res.status(404).send('customers not found');
        }
    }).catch((err) => {
        res.status(500).send("Internal Server Error!");
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})