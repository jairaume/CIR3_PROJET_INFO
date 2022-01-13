const md5 = require("md5");
const Salles = require("./models/salles");

module.exports = function (http, session, db) {
    const io = require("socket.io")(http);
    const sharedsession = require("express-socket.io-session");
    const { body, validationResult } = require("express-validator");
    const Salles = require("./models/salles");
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
                    socket.broadcast.emit("reservationCreated", reservation);
                })
                .catch((err) => {
                    socket.emit("reservationError", err);
                });
        });

        socket.on("cancelReservation", (reservation) => {
            db.cancelReservation(reservation)
                .then((reservation) => {
                    socket.emit("reservationCanceled", reservation);
                })
                .catch((err) => {
                    socket.emit("reservationError", err);
                });
        });
        socket.on("getEvents", () => {
            db.getEvents().then((response) => {
                socket.emit("respondEvents", response);
            });
        });
        socket.on("askReservations", () => {
            let prenom = socket.handshake.session.prenom;
            let nom = socket.handshake.session.nom;
            db.getReservations({ prenom: prenom, nom: nom })
                .then((reservations) => {
                    socket.emit("getReservations", reservations);
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
            socket.emit("roomInfos", Salles);
        });

        socket.on("disconnect", () => {
            // L'utilisateur ferme la page
        });

        socket.on("askSallesInformations", async (floor, annee, mois, jour, horraire) => {
            let currentSalles = JSON.parse(JSON.stringify(Salles.filter((salle) => salle.floor == floor)));
            let request = { $or: [] };
            for (const salle of currentSalles) {
                request.$or.push({ salle: salle.room, annee: annee, mois: mois, jour: jour, horraire: horraire });
            }
            let reservations = await db.getReservations(request);
            currentSalles.map((salle) => {
                if (reservations.find((s) => s.salle == salle.room)) {
                    salle.reserve = true;
                } else {
                    salle.reserve = false;
                }
                delete salle.size;
                delete salle.seats;
                delete salle.floor;
            });
            console.log(currentSalles);
            socket.emit("getSallesInformations", currentSalles);
        });

        socket.on("leave", () => {
            console.log("L'utilisateur \"" + socket.handshake.session.email + "\" s'est deconnecté !");
            delete socket.handshake.session.email;
            socket.handshake.session.save();
        });

        socket.on("getEvents", () => {
            db.getEvents().then((response) => {
                socket.emit("respondEvents", response);
            });
        });

        socket.on("askIsConnected", () => {
            console.log("isConnected, email : ", socket.handshake.session.email);
            socket.emit("respondIsConnected", socket.handshake.session.email);
        });

        socket.on("reservation", (reservation) => {
            console.log(`Une reservation a été faite :
            salle : ${reservation.salle}
            jour : ${reservation.jour}
            mois : ${reservation.mois}
            annee : ${reservation.annee}
            horraire : ${reservation.horraire}
            prenom : ${reservation.prenom}
            nom : ${reservation.nom}
            `);
        });

        socket.on("askName", () => {
            socket.emit("getName", socket.handshake.session.prenom);
        });

        socket.on("askToken", () => {
            if (socket.handshake.session.admin) {
                socket.emit("getToken", md5(socket.handshake.session.email + socket.handshake.session.password));
            }
        })

        socket.on("askSallesInformations", async (floor, annee, mois, jour, horraire) => {
            let currentSalles = JSON.parse(JSON.stringify(Salles.filter((salle) => salle.floor == floor)));
            let request = { $or: [] };
            for (const salle of currentSalles) {
                request.$or.push({ salle: salle.room, annee: annee, mois: mois, jour: jour, horraire: horraire });
            }
            let reservations = await db.getReservations(request);
            currentSalles.map((salle) => {
                if (reservations.find((s) => s.salle == salle.room)) {
                    salle.reserve = true;
                } else {
                    salle.reserve = false;
                }
                delete salle.size;
                delete salle.seats;
                //delete salle.floor;
            });
            console.log(currentSalles);
            socket.emit("getSallesInformations", (currentSalles));
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
                        req.session.email = email;
                        req.session.prenom = prenom;
                        req.session.nom = nom;
                        req.session.admin = admin;
                        req.session.save();
                        console.log("L'utilisateur \"" + email + "\" vient de s'inscrire");
                        res.redirect("/");
                    });
                } else {
                    // L'utilisateur existe déjà
                    console.log("L'utilisateur \"" + email + '" existe déjà');
                    res.redirect("/");
                }
            });
        },
    };
};
