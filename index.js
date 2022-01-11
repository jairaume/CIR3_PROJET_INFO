/**** Import npm libs ****/
const express = require("express");
const app = express();
const http = require("http").Server(app);

<<<<<<< Updated upstream
require("./back/routes")(express, app, http);
=======

const ImageMapper = require('react-image-mapper');
var React = require("react");
var ReactDOM = require("react-dom");
//<ImageMapper src={IMAGE_URL} map={AREAS_MAP}/>

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
let sessionInfo = new Array();

const mysql = require('mysql');
const req = require('express/lib/request');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//config des dossiers de fichiers
app.use(express.static((__dirname + "/front")));
app.use(urlencodedParser);
app.use(session);

//config session
io.use(sharedsession(session, {
    autoSave: true
}));

//Redirection
app.get('/', (req, res) => {
    let sessionsData = req.session;
    if(!sessionsData.email){
        res.sendFile(__dirname + '/front/html/login.html');
    }
    else{
        //si l'email et le mot de passe corresponde à un compte user existant
        res.sendFile(__dirname+"/front/html/index.html")
    }
    //res.sendFile(__dirname + '/front/html/login.html')
});
>>>>>>> Stashed changes



let PORT = process.env.PORT || 55555;
//Start serveur
http.listen(PORT, () => {
  console.log("Serveur lancé sur http://localhost:" + PORT);
});
