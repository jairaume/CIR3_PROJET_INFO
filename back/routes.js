module.exports = function (express, app, http) {
  const session = require("express-session")({
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      secure: false,
    },
  });
  app.use(session);

  const socket = require("./socket")(http, session);
  const path = require("path");
  const bodyParser = require("body-parser");
  const { body, validationResult } = require("express-validator");
  const urlencodedParser = bodyParser.urlencoded({ extended: false });

  //config des dossiers de fichiers
  app.use(express.static(path.join(__dirname, "../front")));

  //Redirection
  app.get("/", (req, res) => {
    if (!req.session.email) {
      res.sendFile(path.join(__dirname, "../front/html/login.html"));
    } else {
      //si l'email et le mot de passe corresponde à un compte user existant
      res.sendFile(path.join(__dirname, "../front/html/index.html"));
    }
  });



  app.post("/login", urlencodedParser, (req, res) => {
    socket.login(req, res);
    console.log("Redirection en cours..");
    res.redirect("/");
  });
};
