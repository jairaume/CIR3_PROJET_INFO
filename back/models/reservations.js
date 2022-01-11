const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    salle: String,
    annee: Number,
    mois: Number,
    jour: Number,
    horraire: String,
    prenom: String,
    nom: String,
});

const Reservations = mongoose.model("reservations", reservationSchema);

module.exports = Reservations;
