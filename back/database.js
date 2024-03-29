const mongoose = require("mongoose");
const Salles = require("./models/salles.js");

mongoose.connect("mongodb://152.228.171.235:14878/projet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connecté à Mongoose");
});

const Users = require("./models/users");
const Reservations = require("./models/reservations");
const md5 = require("md5");

module.exports = {
    // Créer un étudiant
    createUser: async (studentData) => {
        const student = await Users.create(studentData);
        return student;
    },

    // Récupérer des étudiants
    getUsers: async (studentData, selector = "-_id -__v") => {
        const student = await Users.find(studentData).select(selector);
        return student;
    },

    // Créer une réservation
    createReservation: async (reservationData) => {
        const reservation = await Reservations.create(reservationData);
        return reservation;
    },

    // Récupérer des réservations
    getReservations: async (reservationData, selector = "-_id -__v") => {
        const reservation = await Reservations.find(reservationData).select(selector);
        return reservation;
    },

    // Annule une réservation
    cancelReservation: async (reservationData) => {
        const reservation = await Reservations.remove(reservationData);
        return reservation;
    },

    // Récupérer les ressources du calendrier
    getResources: async () => {
        return Salles.map((salle) => ({ id: salle.room, title: salle.room, eventColor: "red" }));
    },

    // Récupérer les événements du calendrier
    getEvents: async () => {
        let reservations = await Reservations.find({}).select("-_id -__v");
        let events = reservations.map((reservation) => {
            let annee = reservation.annee;
            let mois = reservation.mois;
            if (mois < 10) mois = "0" + mois;
            let jour = reservation.jour;
            if (jour < 10) jour = "0" + jour;
            let startHeure = reservation.horraire.split("h")[0];
            if (startHeure < 10) startHeure = "0" + startHeure;
            let startMinutes = reservation.horraire.split("h")[1].split("-")[0];
            if (startMinutes === "") startMinutes = "00";
            let endHeure = reservation.horraire.split("-")[1].split("h")[0];
            if (endHeure < 10) endHeure = "0" + endHeure;
            let endMinutes = reservation.horraire.split("-")[1].split("h")[1];
            if (endMinutes === "") endMinutes = "00";
            let start = annee + "-" + mois + "-" + jour + "T" + startHeure + ":" + startMinutes + ":00";
            let end = annee + "-" + mois + "-" + jour + "T" + endHeure + ":" + endMinutes + ":00";
            return {
                id: reservation.salle,
                resource: reservation.salle,
                start: start,
                end: end,
                title: reservation.prenom + " " + reservation.nom,
            };
        });
        return events;
    },

    getTokens: async () => {
        let users = await Users.find({}).select("-_id -__v");
        let tokens = [];
        for (const user of users) {
            if (user.admin == true) {
                tokens.push(md5(user.email + user.password));
            }
        }
        return tokens;
    },
};
