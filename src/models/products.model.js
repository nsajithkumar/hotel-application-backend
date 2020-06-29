const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-ajith:test123@cluster0-kpttj.mongodb.net/v7Backend", {useNewUrlParser: true, useUnifiedTopology: true});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    createdOn: String,
    updatedOn: String
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;