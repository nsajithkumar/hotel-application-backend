const Product = require("../models/products.model");

exports.create = (req, res) => {
    let dateObject = new Date();
    let currentDateTime = dateObject.getFullYear() + "-" + (parseInt(dateObject.getMonth()) + 1) + "-" + 
                            dateObject.getDate() + " " + dateObject.getHours() + ":" + dateObject.getMinutes() +
                            ":" + dateObject.getSeconds();

    let product = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        createdOn: currentDateTime,
        updatedOn: currentDateTime
    };

    Product.create(product, (err) => {
        if(err) {
            res.send({status: 500, message: "Not Added! Please Try Again Later.", error: err});
        } else {
            res.send({status: 200, message: "Added Successfully!"});
        }
    });
};

exports.readAll = (req, res) => {
    Product.find({}, (err, products) => {
        if(err) {
            res.send({status: 500, message: "Cannot Fetch Prducts! Please Try Again Later.", error: err});
        } else {
            if(products.length > 0) {
                res.send({status: 200, message: "Fetched Successfully!", products: products});
            } else {
                res.send({status: 404, message: "No Products Found"});
            }
        }
    });
};

exports.read = (req, res) => {
    let productId = req.body.productId;

    Product.findOne({_id: productId}, (err, product) => {
        if(err) {
            res.send({status: 500, message: "Cannot Fetch Product! Please Try Again Later.", error: err});
        } else {
            if(product === null) {
                res.send({status: 404, message: "No Product Found"});
            } else {
                res.send({status: 200, message: "Fetched Successfully!", product: product});
            }
        }
    });
};

exports.update = (req, res) => {
    let productId = req.body.productId;

    let dateObject = new Date();
    let currentDateTime = dateObject.getFullYear() + "-" + (parseInt(dateObject.getMonth()) + 1) + "-" + 
                            dateObject.getDate() + " " + dateObject.getHours() + ":" + dateObject.getMinutes() +
                            ":" + dateObject.getSeconds();

    let product = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        updatedOn: currentDateTime
    };

    Product.updateOne({_id: productId}, product, (err) => {
        if(err) {
            res.send({status: 500, message: "Cannot Update Product! Please Try Again Later.", error: err});
        } else {
            res.send({status: 200, message: "Updated Successfully!"});
        }
    });
};

exports.delete = (req, res) => {
    let productId = req.body.productId;

    Product.deleteOne({_id: productId}, (err) => {
        if(err) {
            res.send({status: 500, message: "Cannot Delete Profile! Please Try Again Later.", error: err});
        } else {
            res.send({status: 200, message: "Deleted Successfully!"});
        }
    });
};
