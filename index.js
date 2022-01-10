/**** Import npm libs ****/
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

app.post('/login', urlencodedParser, (req,res) =>{
    const email = req.body.email;
    const password = req.body.password

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
    }
    else{
        req.session.email = email;
        req.session.password = password;
        req.session.save();
        console.log(email + " s'est connecté ! ")
        sessionInfo[req.sessionsId] = email;

        res.redirect('/');
    }
});

io.on('connection', (socket) => {
    console.log('Un Utilisateur s\'est connecté');

})




let PORT = process.env.PORT || 55555
//Start serveur
http.listen(PORT, () => {
    console.log('Serveur lancé sur le port ',PORT);
});


io.on('connection', (socket) =>{
    console.log("Nouvel utilisateur !")
    socket.on('leave', ()=>{
        console.log(socket.handshake.session.email + " veut se deconnecter !")
        socket.handshake.session.email = '';
        socket.handshake.session.password = '';
        req.session = null;
    })
});