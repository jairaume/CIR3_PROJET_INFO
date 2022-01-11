const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    prenom: String,
    nom: String,
    email: String,
    password: String,
    promo: String,
    admin: Boolean,
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
