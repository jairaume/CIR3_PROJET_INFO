/**** Import npm libs ****/
const express = require("express");
const path = require("path");
const app = express();
const http = require("http").Server(app);

require("./back/socket")(http);

const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

//config des dossiers de fichiers
app.use(express.static(path.join(__dirname, "/front")));

//Redirection
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/front/html/login.html"));
});

let PORT = process.env.PORT || 55555;
//Start serveur
http.listen(PORT, () => {
    console.log("Serveur lancé sur http://localhost:" + PORT);
});
