const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/projet", {
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
};
