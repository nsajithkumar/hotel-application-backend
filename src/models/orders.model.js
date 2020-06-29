const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-ajith:test123@cluster0-kpttj.mongodb.net/v7Backend", {useNewUrlParser: true, useUnifiedTopology: true});

const orderSchema = new mongoose.Schema({
    customerId: String,
    customerName: String,
    productId: [],
    productName: [],
    productAmount: [],
    orderedOn: String
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;