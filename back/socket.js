module.exports = function (http, session, db) {
    const io = require("socket.io")(http);
    const sharedsession = require("express-socket.io-session");
    const { body, validationResult } = require("express-validator");

    //config session
    io.use(sharedsession(session, { autoSave: true }));

    io.on("connection", (socket) => {
        socket.on("createReservation", ({ salle, annee, mois, jour, horraire }) => {
            db.createReservation({
                salle: salle,
                annee: annee,
                mois: mois,
                jour: jour,
                horraire: horraire,
                prenom: socket.handshake.session.prenom,
                nom: socket.handshake.session.nom,
            })
                .then((reservation) => {
                    socket.emit("reservationCreated", reservation);
                })
                .catch((err) => {
                    socket.emit("reservationError", err);
                });
        });

        socket.on("isRoomAvailable", (roomNumber) => {
            // Renvoyer un boléen
        });

        socket.on("roomCaracteristiques", (roomNumber) => {
            // Obtenir puis envoyer au front les différentes caractéristiques de la room demandée
        });

        socket.on("disconnect", () => {
            // L'utilisateur ferme la page
        });

        socket.on("leave", () => {
            console.log("L'utilisateur \"" + socket.handshake.session.email + "\" s'est deconnecté !");
            delete socket.handshake.session.email;
            socket.handshake.session.save();
        });
    });

    // Fonctions utilisables dans "./routes.js"
    return {
        // Connexion
        login: (req, res) => {
            const email = req.body.email;
            const password = req.body.password;

            // TEMPORAIRE (pour les tests) :
            if (email === "admin" && password === "admin") {
                req.session.email = email;
                req.session.prenom = "admin";
                req.session.nom = "admin";
                req.session.admin = true;
                req.session.save();
                console.log("L'utilisateur \"" + email + "\" s'est connecté !");
                res.redirect("/");
                return;
            }

            // On regarde dans la DB si l'email et le mot de passe existent
            db.getUsers({ email, password }).then((users) => {
                if (users.length === 0) {
                    // L'utilisateur n'existe pas
                    console.log("L'utilisateur", { email, password }, "n'existe pas");
                } else {
                    // L'utilisateur existe
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        console.log(errors);
                    } else {
                        req.session.email = email;
                        req.session.prenom = users[0].prenom;
                        req.session.nom = users[0].nom;
                        req.session.admin = users[0].admin;
                        req.session.save();
                        console.log("L'utilisateur \"" + email + "\" s'est connecté !");
                    }
                }
                res.redirect("/");
            });
        },

        // Inscription
        signup: (req, res) => {
            const prenom = req.body.prenom;
            const nom = req.body.nom;
            const email = req.body.email;
            const password = req.body.password;
            const promo = req.body.promo;
            const admin = false; // Pas admin par défaut

            // On regarde dans la DB si l'email existe déjà
            db.getUsers({ email }).then((users) => {
                if (users.length === 0) {
                    // L'utilisateur n'existe pas encore
                    db.createUser({ prenom, nom, email, password, promo, admin }).then(() => {
                        console.log("L'utilisateur \"" + email + "\" vient de s'inscrire");
                    });
                } else {
                    // L'utilisateur existe déjà
                    console.log("L'utilisateur \"" + email + '" existe déjà');
                }
            });
            res.redirect("/");
        },
    };
};
