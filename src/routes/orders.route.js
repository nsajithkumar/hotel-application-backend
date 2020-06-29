const orders = require("../controllers/orders.controller");

module.exports = (app) => {

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    app.post("/order/create", orders.create);

    app.get("/order/read", orders.readAll);

    app.post("/order/read", orders.read);
    
};