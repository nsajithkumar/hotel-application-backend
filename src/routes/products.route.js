const products = require("../controllers/products.controller");

module.exports = (app) => {

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    app.post("/product/create", products.create);

    app.get("/product/read", products.readAll);

    app.post("/product/read", products.read);

    app.post("/product/update", products.update);

    app.post("/product/delete", products.delete);
    
};