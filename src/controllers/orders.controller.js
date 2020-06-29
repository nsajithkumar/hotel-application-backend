const Order = require("../models/orders.model");

exports.create = (req, res) => {
    let dateObject = new Date();
    let currentDateTime = dateObject.getFullYear() + "-" + (parseInt(dateObject.getMonth()) + 1) + "-" + 
                            dateObject.getDate() + " " + dateObject.getHours() + ":" + dateObject.getMinutes() +
                            ":" + dateObject.getSeconds();

    let order = {
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        productId: req.body.productId,
        productName: req.body.productName,
        productAmount: req.body.productAmount,
        orderedOn: currentDateTime,
    };

    Order.create(order, (err) => {
        if(err) {
            res.send({status: 500, message: "Not Ordered! Please Try Again Later.", error: err});
        } else {
            res.send({status: 200, message: "Order Placed Successfully!"});
        }
    });
};

exports.readAll = (req, res) => {
    Order.find({}, (err, orders) => {
        if(err) {
            res.send({status: 500, message: "Cannot Fetch Orders! Please Try Again Later.", error: err});
        } else {
            if(orders.length > 0) {
                res.send({status: 200, message: "Fetched Successfully!", orders: orders});
            } else {
                res.send({status: 404, message: "No orders Found"});
            }
        }
    });
};

exports.read = (req, res) => {
    let customerId = req.body.customerId;
    let orderId = req.body.orderId;

    if(typeof(orderId) !== "undefined") {
        Order.findOne({_id: orderId}, (err, order) => {
            if(err) {
                res.send({status: 500, message: "Cannot Fetch Order! Please Try Again Later.", error: err});
            } else {
                if(order === null) {
                    res.send({status: 404, message: "No Product Found"});
                } else {
                    res.send({status: 200, message: "Fetched Successfully!", order: order});
                }
            }
        });
    } else if(typeof(customerId) !== "undefined") {
        Order.find({customerId: customerId}, (err, orders) => {
            if(err) {
                res.send({status: 500, message: "Cannot Fetch Orders! Please Try Again Later.", error: err});
            } else {
                if(orders.length > 0) {
                    res.send({status: 200, message: "Fetched Successfully!", orders: orders});
                } else {
                    res.send({status: 404, message: "No Orders Found"});
                }
            }
        });
    }
};