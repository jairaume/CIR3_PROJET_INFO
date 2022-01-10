module.exports = function (http, session) {
  const io = require("socket.io")(http);
  const db = require("./database");
  const sharedsession = require("express-socket.io-session");
  const { body, validationResult } = require("express-validator");

  //config session
  io.use(
    sharedsession(session, {
      autoSave: true,
    })
  );

  io.on("connection", (socket) => {
    if (!socket.handshake.session.email) {
      console.log("Nouvel utilisateur vient d'arriver.");
    } else {
      console.log(socket.handshake.session.email + " s'est connecté !!");
    }

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
     console.log("page f5 ou deco.");
    });

    socket.on("leave", () => {
      console.log(socket.handshake.session.email + " veut se deconnecter !");
      delete socket.handshake.session.email;
      socket.handshake.session.save();
    });
  });
  return {
    login: (req, res) => {
      const email = req.body.email;
      const password = req.body.password;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
      } else {
        req.session.email = email;
        req.session.password = password;
        req.session.save();
        console.log(email + " s'est connecté ! ");
      }
    },
  };
};
