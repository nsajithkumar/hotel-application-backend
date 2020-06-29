const Log = require("../models/logs.model");

exports.create = (req, res) => {
    let dateObject = new Date();
    let currentDateTime = dateObject.getFullYear() + "-" + (parseInt(dateObject.getMonth()) + 1) + "-" + 
                            dateObject.getDate() + " " + dateObject.getHours() + ":" + dateObject.getMinutes() +
                            ":" + dateObject.getSeconds();

    let log = {
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        loggedOn: currentDateTime,
        loggedOff: null
    };

    Log.create(log, (err, log) => {
        if(err) {
            res.send({status: 500, message: "Not Added! Please Try Again Later.", error: err});
        } else {
            res.send({status: 200, message: "Added Successfully!", logId: log._id});
        }
    });
};

exports.readAll = (req, res) => {
    Log.find({}, (err, logs) => {
        if(err) {
            res.send({status: 500, message: "Cannot Fetch Logs! Please Try Again Later.", error: err});
        } else {
            if(logs.length > 0) {
                res.send({status: 200, message: "Fetched Successfully!", logs: logs});
            } else {
                res.send({status: 404, message: "No logs Found"});
            }
        }
    });
};

exports.read = (req, res) => {
    let customerId = req.body.customerId;
    let logId = req.body.logId;

    if(typeof(logId) !== "undefined") {
        Log.findOne({_id: logId}, (err, log) => {
            if(err) {
                res.send({status: 500, message: "Cannot Fetch Log! Please Try Again Later.", error: err});
            } else {
                if(log === null) {
                    res.send({status: 404, message: "No Product Found"});
                } else {
                    res.send({status: 200, message: "Fetched Successfully!", log: log});
                }
            }
        });
    } else if(typeof(customerId) !== "undefined") {
        Log.find({customerId: customerId}, (err, logs) => {
            if(err) {
                res.send({status: 500, message: "Cannot Fetch Logs! Please Try Again Later.", error: err});
            } else {
                if(logs.length > 0) {
                    res.send({status: 200, message: "Fetched Successfully!", logs: logs});
                } else {
                    res.send({status: 404, message: "No Logs Found"});
                }
            }
        });
    }
};

exports.update = (req, res) => {
    let logId = req.body.logId;

    let dateObject = new Date();
    let currentDateTime = dateObject.getFullYear() + "-" + (parseInt(dateObject.getMonth()) + 1) + "-" + 
                            dateObject.getDate() + " " + dateObject.getHours() + ":" + dateObject.getMinutes() +
                            ":" + dateObject.getSeconds();

    let log = {
        loggedOff: currentDateTime
    };

    Log.updateOne({_id: logId}, log, (err) => {
        if(err) {
            res.send({status: 500, message: "Cannot Update log! Please Try Again Later.", error: err});
        } else {
            res.send({status: 200, message: "Updated Successfully!"});
        }
    });
};