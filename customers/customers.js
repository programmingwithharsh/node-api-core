const express = require("express");
const cors = require('cors');
require("../db/db");
const Customer = require("./Customer");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// GET API, to display Hello Message
app.get('/', function (req, res) {
    res.send('Hello World');
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})