const Salles = require("./models/salles.js");

module.exports = function (app, session, db) {
    app.get("/api/get/reservations/:salle", (req, res) => {
        const salle = req.params.salle;
        db.getReservations({ salle }).then((reservations) => {
            res.json(reservations);
        });
    });

    app.get("/api/get/users", (req, res) => {
        db.getUsers(req.query, "-_id -__v -password").then((users) => {
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

    app.get("/api/post/", (req, res) => {
        db.getTokens().then((tokens) => {
            if (tokens.includes(req.query.token)) {
                if (req.query.action === "create") {
                    let data = req.query;
                    if (
                        data.salle &&
                        data.annee &&
                        data.mois &&
                        data.jour &&
                        data.horraire &&
                        data.prenom &&
                        data.nom
                    ) {
                        db.createReservation(data).then((reservation) => {
                            res.json(reservation);
                        });
                    } else {
                        res.send("Erreur: Veuillez remplir tous les champs.");
                    }
                }
                else if (req.query.action === "delete") {
                    let data = req.query;
                    if (
                        data.salle &&
                        data.annee &&
                        data.mois &&
                        data.jour &&
                        data.horraire
                    ) {
                        db.cancelReservation(data).then((reservation) => {
                            res.json(reservation);
                        });
                    } else {
                        res.send("Erreur: Veuillez remplir tous les champs.");
                    }
                }
                else {
                    res.send("Erreur: Veuillez entrer une action valide.");
                }
            } else {
                res.send("Unauthorized");
            }
        });
    });
};
