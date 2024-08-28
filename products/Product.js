const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    productId: {
        type: Number,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    productCode: {
        type: String,
        require: true
    },
    releaseDate: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    starRating: {
        type: Number,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;