const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-ajith:test123@cluster0-kpttj.mongodb.net/v7Backend", {useNewUrlParser: true, useUnifiedTopology: true});

const profileSchema = new mongoose.Schema({
    username: String,
    mobileNumber: Number,
    emailId: String,
    role: String,
    password: String,
    createdOn: String,
    updatedOn: String
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;