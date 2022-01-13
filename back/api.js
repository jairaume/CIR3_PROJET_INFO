const Salles = require("./models/salles.js");

module.exports = function (app, session, db) {
    app.get("/api/get/reservations/:salle", (req, res) => {
        const salle = req.params.salle;
        db.getReservations({ salle }).then((reservations) => {
            res.json(reservations);
        });
    });

    app.get("/api/get/users", (req, res) => {
        db.getUsers(req.query).then((users) => {
            res.json(users);
        });
    });

    app.get("/api/get/salles", (req, res) => {
        res.json(Salles);
    });

    app.get("/api/get/salles/:floor", (req, res) => {
        res.json(Salles.filter((salle) => salle.floor === req.params.floor));
    });

    app.get("/api/get/calendar/resources", (req, res) => {
        db.getResources().then((resources) => {
            res.json(resources);
        });
    });

    app.get("/api/get/calendar/events", (req, res) => {
        db.getEvents().then((events) => {
            res.json(events);
        });
    });
};
