const Profile = require("../models/profiles.model");
const MD5 = require("md5");

exports.create = (req, res) => {
    let dateObject = new Date();
    let currentDateTime = dateObject.getFullYear() + "-" + (parseInt(dateObject.getMonth()) + 1) + "-" + 
                            dateObject.getDate() + " " + dateObject.getHours() + ":" + dateObject.getMinutes() +
                            ":" + dateObject.getSeconds();

	let password = MD5(req.body.password)	

    let profile = {
        username: req.body.username,
        mobileNumber: req.body.mobileNumber,
        emailId: req.body.emailId,
        role: req.body.role,
        password: password,
        createdOn: currentDateTime,
        updatedOn: currentDateTime
    };

    Profile.find({emailId: profile.emailId, mobileNumber: req.body.mobileNumber}, (err, result) => {
        if(err) {
            res.send({status: 500, message: "Not Registered! Please Try Again Later."});
        } else {
            if(result.length === 0) {
                Profile.create(profile, (err, profile) => {
                    if(err) {
                        res.send({status: 500, message: "Not Registered! Please Try Again Later.", error: err});
                    } else {
                        
                        res.send({status: 200, message: "Inserted Successfully!", profileId: profile._id, 
                        username: profile.username, emaildId: profile.emailId});
                    }
                });
            } else {
                res.send({status: 201, message: "Email-Id is Already Registered"});
            }
        }
    });
};

exports.readAll = (req, res) => {
    Profile.find({}, ['username', 'mobileNumber', 'emailId', 'createdOn', 'updatedOn'], (err, profiles) => {
        if(err) {
            res.send({status: 500, message: "Cannot Fetch Profiles! Please Try Again Later.", error: err});
        } else {
            if(profiles.length > 0) {
                res.send({status: 200, message: "Fetched Successfully!", profiles: profiles});
            } else {
                res.send({status: 404, message: "No Profiles Found"});
            }
        }
    });
};

exports.read = (req, res) => {
    let profileId = req.body.profileId;
    let role = req.body.role;
    let emailId = req.body.emailId;
    if(typeof(req.body.password) !== "undefined"){
	let password = MD5(req.body.password);
    }

    if(typeof(profileId) !== "undefined") {
        Profile.findOne({_id: profileId}, ['username', 'mobileNumber', 'emailId', 'createdOn', 'updatedOn'], (err, profile) => {
            if(err) {
                res.send({status: 500, message: "Cannot Fetch Profile! Please Try Again Later.", error: err});
            } else {
                if(profile === null) {
                    res.send({status: 404, message: "No Profile Found"});
                } else {
                    res.send({status: 200, message: "Fetched Successfully!", profile: profile});
                }
            }
        });
    } else if(typeof(emailId) !== "undefined") {
        Profile.findOne({emailId: emailId}, ['username', 'mobileNumber', 'emailId', 'createdOn', 'updatedOn'], (err, profile) => {
            if(err) {
                res.send({status: 500, message: "Cannot Fetch Profile! Please Try Again Later.", error: err});
            } else {
                if(profile === null) {
                    res.send({status: 404, message: "No Profile Found"});
                } else {
                    res.send({status: 200, message: "Fetched Successfully!", profile: profile});
                }
            }
        });
    } else if(typeof(password) !== "undefined") {
        Profile.findOne({emailId: emailId, password: password}, ['username', 'mobileNumber', 'emailId', 'createdOn', 'updatedOn'], (err, profile) => {
            if(err) {
                res.send({status: 500, message: "Cannot Fetch Profile! Please Try Again Later.", error: err});
            } else {
                if(profile === null) {
                    res.send({status: 404, message: "No Profile Found"});
                } else {
                    res.send({status: 200, message: "Fetched Successfully!", profile: profile});
                }
            }
        });
    } else if(typeof(role) !== "undefined") {
        Profile.find({role: role}, ['username', 'mobileNumber', 'emailId', 'createdOn', 'updatedOn'], (err, profiles) => {
            if(err) {
                res.send({status: 500, message: "Cannot Fetch Profile! Please Try Again Later.", error: err});
            } else {
                if(profiles.length > 0) {
                    res.send({status: 200, message: "Fetched Successfully!", profiles: profiles});
                } else {
                    res.send({status: 404, message: "No Profiles Found"});
                }
            }
        });
    }
};

exports.update = (req, res) => {
    let profileId = req.body.profileId;
    let password = req.body.password;

    let dateObject = new Date();
    let currentDateTime = dateObject.getFullYear() + "-" + (parseInt(dateObject.getMonth()) + 1) + "-" + 
                            dateObject.getDate() + " " + dateObject.getHours() + ":" + dateObject.getMinutes() +
                            ":" + dateObject.getSeconds();

    if(typeof(password) !== "undefined") {
        var profile = {
            password: MD5(password),
            updatedOn: currentDateTime
        };
    } else {
        var profile = {
            username: req.body.username,
            mobileNumber: req.body.mobileNumber,
            updatedOn: currentDateTime
        };
    }

    Profile.updateOne({_id: profileId}, profile, (err) => {
        if(err) {
            res.send({status: 500, message: "Cannot Update Profile! Please Try Again Later.", error: err});
        } else {
            res.send({status: 200, message: "Updated Successfully!"});
        }
    });
};

exports.delete = (req, res) => {
    let profileId = req.body.profileId;

    Profile.deleteOne({_id: profileId}, (err) => {
        if(err) {
            res.send({status: 500, message: "Cannot Delete Profile! Please Try Again Later.", error: err});
        } else {
            res.send({status: 200, message: "Deleted Successfully!"});
        }
    });
};
