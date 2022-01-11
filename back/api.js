module.exports = function (app, session, db) {
    app.get("/api/get/reservations/:salle", (req, res) => {
        const salle = req.params.salle;
        db.getReservations({ salle }).then((reservations) => {
            res.json(reservations);
        });
    });

    
    app.get("/api/get/users", (req, res) => {
        db.getUsers({}).then((users) => {
            res.json(users);
        });
    });
};
