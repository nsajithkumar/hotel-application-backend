const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

//routes

require("./src/routes/logs.route")(app);
require("./src/routes/orders.route")(app);
require("./src/routes/products.route")(app);
require("./src/routes/profiles.route")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is listening to the port " + port);
});