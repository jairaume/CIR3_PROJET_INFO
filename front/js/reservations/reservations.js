let socket = io();
let past = document.getElementById("past");
let future = document.getElementById("future");
var admin;

let currentDate = new Date();

socket.emit("getIsAdmin");
socket.on("isAdmin", (data) => {
   admin = data;

   socket.emit("askReservations");
   socket.on("getReservations", (reservations) => {
    if (reservations.length == 0) {
      past.innerHTML = "Vous n'avez pas de réservation";
      past.style.display = "block";
      past.style.textAlign = "center";
      return;
    }
  
    reservations = reservations.sort((a, b) => {
      let aheures = a.horraire.split("h")[0];
      let aminutes = a.horraire.split("h")[1].split("-")[0];
      if (aminutes === "") aminutes = 0;
      let aDate = new Date(a.annee, a.mois - 1, a.jour, aheures, aminutes);
  
      let bheures = b.horraire.split("h")[0];
      let bminutes = b.horraire.split("h")[1].split("-")[0];
      if (bminutes === "") aminutes = 0;
      let bDate = new Date(b.annee, b.mois - 1, b.jour, bheures, bminutes);
  
      return aDate.getTime() - bDate.getTime();
     
    });
  
   
  
    reservations.forEach((reservation) => {
      
      let card = document.createElement("div");
      card.classList.add("card");
      let h2 = document.createElement("h2");
      h2.innerText = reservation.salle;
      let prefix = "";
      if (reservation.mois < 10) prefix = "0";
      let p = document.createElement("p");
      p.innerText =
        reservation.jour +
        "/" +
        prefix +
        reservation.mois +
        "/" +
        reservation.annee;
      let p2 = document.createElement("p");
      p2.innerText = reservation.horraire;
      card.appendChild(h2);
  
      if (admin) {
          let p3 = document.createElement("p");
        p3.innerText = reservation.prenom + " " + reservation.nom;
        card.appendChild(p3);
      }
      
      
  
      card.appendChild(p);
      card.appendChild(p2);
  
      let heures = reservation.horraire.split("h")[0];
      let minutes = reservation.horraire.split("h")[1].split("-")[0];
      if (minutes === "") minutes = 0;
      let cardDate = new Date(
        reservation.annee,
        reservation.mois - 1,
        reservation.jour,
        heures,
        minutes
      );
  
      if (cardDate.getTime() < currentDate.getTime()) {
        past.appendChild(card);
      } else {
        let button = document.createElement("button");
        button.innerText = "Annuler";
        button.addEventListener("click", () => {
          socket.emit("cancelReservation", reservation);
          card.remove();
        });
        card.appendChild(button);
        future.appendChild(card);
      }
    });
  });
  
  socket.emit("askToken");
  
  socket.on("getToken", (token) => {
    document.getElementById("token").innerHTML =
      'Token admin (gardez cette information secrète !) : <br/><span class="spoiler">' +
      token +
      "</span>";
  
    document.querySelectorAll(".spoiler").forEach((spoiler) => {
      spoiler.addEventListener("click", () => {
        spoiler.classList.toggle("spoiler-active");
      });
    });
  });
  
});
