const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const helmet = require('helmet')
const app = express();

app.use(helmet())

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//routes

require("./src/routes/logs.route")(app);
require("./src/routes/orders.route")(app);
require("./src/routes/products.route")(app);
require("./src/routes/profiles.route")(app);
require("./src/routes/sendmail.route")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is listening to the port " + port);
});