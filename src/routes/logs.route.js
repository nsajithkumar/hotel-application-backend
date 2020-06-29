const logs = require("../controllers/logs.controller");

module.exports = (app) => {

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    app.post("/log/create", logs.create);

    app.get("/log/read", logs.readAll);

    app.post("/log/read", logs.read);

    app.post("/log/update", logs.update);

};