const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connecté à Mongoose");
});

const Example = require(".models/example.js");

// Créer un étudiant
const createStudent = async (studentData) => {
  const student = await Example.create(studentData);
  return student;
};

// Récupérer un étudiant
const findStudent = async (firstName) => {
  const student = await Example.findOne({ firstName });
  return student;
};

// Récupérer tous les étudiants
const findStudents = async () => {
  const student = await Example.find({});
  return student;
};
