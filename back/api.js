module.exports = function (app, session, db) {
    app.get("/api/get/reservations/:salle", (req, res) => {
        console.log("test")
        const salle = req.params.salle;
        db.getReservations({ salle }).then((reservations) => {
            res.json(reservations);
        });
    });
};
