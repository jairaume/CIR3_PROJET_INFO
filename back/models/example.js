const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String
});

const Example = mongoose.model("users", userSchema);

module.exports = Example;
