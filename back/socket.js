module.exports = function socketio(http) {
  const io = require("socket.io")(http);
  const db = require("./database")
  const sharedsession = require("express-socket.io-session");

  const session = require("express-session")({
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      secure: false,
    },
  });

  //config session
  io.use(
    sharedsession(session, {
      autoSave: true,
    })
  );

  io.on("connection", (socket) => {
    console.log("Un utilisateur s'est connecté");

    socket.on("register", (userMail, userMDP) => {
      // Vérifier que le mail et mdp existent et correspondent en BDD pour connecter l'utilisateur
    });

    socket.on("isRoomAvailable", (roomNumber) => {
      // Renvoyer un boléen
    });

    socket.on("roomCaracteristiques", (roomNumber) => {
      // Obtenir puis envoyer au front les différentes caractéristiques de la room demandée
    });
    socket.on("disconnect", () => {
      console.log("Un utilisateur s'est déconnecté");
    });
  });
};
