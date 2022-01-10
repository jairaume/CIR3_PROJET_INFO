module.exports = function socketio(http) {
    const io = require("socket.io")(http);
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
        console.log("Un Utilisateur s'est connecté");

        io.on("disconnect", () => {
            console.log("Un utilisateur s'est déconnecté");
        })
    });
};
