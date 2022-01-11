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
    findUsers: async (studentData) => {
        const student = await Users.find(studentData);
        return student;
    },

    // Récupérer tous les étudiants
    findAllUsers: async () => {
        const student = await Users.find({});
        return student;
    },

    // Créer une réservation
    createReservation: async (reservationData) => {
        const reservation = await Reservations.create(reservationData);
        return reservation;
    },
};
