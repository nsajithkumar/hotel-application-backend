const profiles = require("../controllers/profiles.controller");

module.exports = (app) => {

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    app.post("/profile/create", profiles.create);

    app.get("/profile/read", profiles.readAll);

    app.post("/profile/read", profiles.read);

    app.post("/profile/update", profiles.update);

    app.post("/profile/delete", profiles.delete);

};