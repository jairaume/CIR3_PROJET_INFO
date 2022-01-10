const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const session = require("express-session")({
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});
const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

//config des dossiers de fichiers
app.use(express.static((__dirname + "/front")));

//config session
io.use(sharedsession(session, {
    autoSave: true
}));

//Redirection
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'front/html/login.html')
});

let PORT = process.env.PORT || 55555
//Start serveur
http.listen(PORT, () => {
    console.log('Serveur lancé sur le port ',PORT);
});