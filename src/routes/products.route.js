const products = require("../controllers/products.controller");
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({
    uploadDir: './uploads'
});

module.exports = (app) => {

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    app.post("/product/create", multipartMiddleware, products.create);

    app.get("/product/read", products.readAll);

    app.post("/product/read", products.read);

    app.post("/product/update", products.update);

    app.post("/product/delete", products.delete);
    
};