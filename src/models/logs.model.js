const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-ajith:test123@cluster0-kpttj.mongodb.net/v7Backend", {useNewUrlParser: true, useUnifiedTopology: true});

const logSchema = new mongoose.Schema({
    customerId: String,
    customerName: String,
    loggedOn: String,
    loggedOff: String
});

const Log = mongoose.model("log", logSchema);

module.exports = Log;