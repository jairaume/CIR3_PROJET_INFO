// --------------------------- Affichage reservation et interactions ---------------------------

/*const socket = require("../../../back/socket");

let disconnectbtn = document.getElementById("disconnectBtn");

disconnectbtn.addEventListener('click',()=>{
    socket.emit('leave');
    window.location.reload();
})*/

let reservDB = {
    salle:String,
    annee: Number,
    mois: Number,
    jour: Number,
    horraire: String,
}

let time = new Date()
let years = time.getFullYear()       // Année écrite entièrement (ex:2022)
let month = time.getMonth()           // Mois [0-11]
let dayNumberOfMonth = time.getDate() // Numéro du jour du mois [1-31]
let dayNumberOfWeek = time.getDay() // Numéro du jour de la semaine [0-6]
let hours = time.getHours()         // Heures [0-23]
let mins = time.getMinutes()        // Minutes [0-59]

let days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
let months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Decembre"]

// creneaux[X] --> Xème creneau
// creneaux[X][0] --> renvoie un tableau qui en 1er élément contient l'heure de début et en second les minutes de l'heure de début
// creneaux[X][1] --> renvoie un tableau qui en 1er élément contient l'heure de fin et en second les minutes de l'heure de fin
let creneaux = [
    [{hour:8,min:"00"},{hour:10,min:"00"}],
    [{hour:10,min:30},{hour:12,min:30}],
    [{hour:13,min:30},{hour:15,min:30}],
    [{hour:15,min:50},{hour:17,min:50}]
]
let creneauxNbr = creneaux.length+1

let etages = [-1,0,2,4,6,8,9]

/* ------------- Creneau actuel --------------- */
//let body = document.getElementsByTagName("body")[0]
let body = document.getElementById("reservationDiv")
let div = document.createElement("div")

/* ------------- Balise d'annonce de la "reservation" --------------- */
let reservationText = document.createElement("p")
reservationText.textContent="Reservation"
reservationText.id="reserv"
body.appendChild(reservationText)

/* ------------- Flexbox de la reservation et du calendrier--------------- */
let flexbox = document.createElement("div")
flexbox.id="flexbox"

/* ------------- Balise de la reservation --------------- */

// Date du jour affichée
let reservDiv = document.createElement("div")
let dateText = `${days[dayNumberOfWeek-1]} ${dayNumberOfMonth} ${months[month]} ${years}`;

// Input des différents créneaux
let option
for(creneau of creneaux){ // On passe dans les 4 différents créneaux du tableau "créneaux"
    let valeurs = `${creneau[0].hour}h${creneau[0].min}-${creneau[1].hour}h${creneau[1].min}` // Différentes valeurs du créneau actuel

    if(creneau[0].hour <= hours && creneau[1].hour > hours){ // Si l'heure min du créneau <= à l'heure actuelle et l'heure max > à l'heure actuelle
        option += "<option selected>" // On selectionne par défaut ce créneau
        reservDB.horraire = valeurs
    }else{
        option += "<option>"
    }
    option += valeurs + "</option>"
}

// Input des différents étages
let option2
for(etage of etages){ // On passe dans les 4 différents créneaux du tableau "créneaux"
    let valeur = etage
    option2 += "<option>"+valeur+"</option>"
}

let dateTextDiv = "<div id='dateText'>"+dateText+"</div>"
let creneauDiv = "<div>Creneau : <select id='creneaux'>"+option+"</select></div>"
let etageDiv = "<div>Etage : <select id='etages'>"+option2+"</select></div>"

reservDiv.innerHTML= dateTextDiv+creneauDiv+etageDiv

/* ------------- Balise du calendrier --------------- */
let calendrierDiv = document.createElement("div")
calendrierDiv.innerHTML="Date de la reservation : <br>"

let calendrier = document.createElement("input")
calendrier.type="date"
calendrier.id="calendrier"

// Setting du calendrier au lancement de la page web
let trueMonth
if(month!=10 && month!=11 && month!=12) trueMonth = "0"+(month+1)
else trueMonth= (month+1)

calendrier.value=`${years}-${trueMonth}-${dayNumberOfMonth}`
calendrier.min=calendrier.value
calendrierDiv.appendChild(calendrier)

reservDB.jour = Number(dayNumberOfMonth)
reservDB.mois = Number(trueMonth)
reservDB.annee = Number(years)

// Bouton pour afficher le reservDB
let infoDiv = document.createElement("div")
let infoButton = '<input type="button" id="infos" value="Infos envoyées à DB">'
infoDiv.innerHTML = infoButton

infoDiv.addEventListener("click",event=>{
    event.preventDefault()
    console.log(reservDB)
})

// Bouton "Envoyer à la DB"
let boutonDB = '<div><input type="button" id="reservation" value="Reserver cette salle"></div>'
reservDiv.innerHTML+=boutonDB

flexbox.appendChild(reservDiv)
flexbox.appendChild(calendrierDiv)
body.appendChild(flexbox)

body.appendChild(infoDiv) // a suppr

/* ------------- Actualisation des champs lors d'interactions --------------- */


// Actualisation de la valeur "horraire" qui sera envoyée à la DB
document.getElementById("creneaux").addEventListener("change",event=>{
   reservDB.horraire = document.getElementById("creneaux").value
})

// Lien entre le calendrier à droite et l'affichage de la date de reservation à gauche, lors d'un changement du calendrier
// Actualisation de la valeur de "année","mois","jour" qui sera envoyée à la DB
calendrier.addEventListener("change",event=>{
    event.preventDefault();

    let dateDiv = document.getElementById("dateText")
    let newDate = new Date(calendrier.value)

    // Actualisation des champs jour,mois,année pour la DB
    let options = {day:"2-digit",month:"2-digit",year:"numeric"}     // options pour avoir la date en format : xx/xx/xxxx
    let dateForDB = newDate.toLocaleDateString(undefined,options).split('/')
    reservDB.jour = dateForDB[0]
    reservDB.mois = dateForDB[1]
    reservDB.annee = dateForDB[2]

    // Actualisation de l'affichage de la date pour l'utilisateur
    options = {weekday:"long",month:"long",day:"2-digit",year:"numeric"} // options pour avoir la date en format : Lundi 17 Janvier 20200
    let dateForHuman = newDate.toLocaleDateString(undefined,options)
    let dateSplited = dateForHuman.split(' ')
    let dateFinale = ''

    // Renvoie une chaine de caractère dont le premier élément est en majuscule
    function strUcFirst(a){return (a+'').charAt(0).toUpperCase()+a.substr(1);}
    
    for(let i=0;i<dateSplited.length;i++){
        if(i==0||i==2) { // correspond au traitement du jour et du mois, qui sont des strings, à l'inverse des autres champs
            dateSplited[i]=strUcFirst(dateSplited[i]) // Même mot mais avec une majuscule au début
        }
        dateFinale+=`${dateSplited[i]} `
    }

    // Actualise l'affichage de la date de reservation
    dateDiv.textContent=dateFinale
})

// Interaction avec le bouton "Reserver cette salle"
document.getElementById("reservation").addEventListener("click",event=>{
    event.preventDefault()
    let problems = {salle:false,jour:false,mois:false,annee:false,horraire:false}
    let isConnected
    socket.on("respondIsConnected", respondIsConnected => {
        isConnected=respondIsConnected
    })

    // Vérification de la validté de chaque élément envoyé à la DB
    if(!reservDB.salle.value) problems.salle=true
    if(!reservDB.jour.value) problems.jour=true
    if(!reservDB.mois.value) problems.mois=true
    if(!reservDB.annee.value) problems.annee=true
    if(!reservDB.horraire.value) problems.horraire=true


    if(problems.salle) alert("Veuillez indiquer une salle à réserver.")
    else if(problems.jour) alert("Veuillez indiquer un jour à réserver.")
    else if(problems.mois) alert("Veuillez indiquer un mois à réserver.")
    else if(problems.annee) alert("Veuillez indiquer une année à réserver.")
    else if(problems.horraire) alert("Veuillez indiquer un horraire à réserver.")
    else if(!isConnected) alert("Veuillez vous connecter avant de faire une reservation.")
    else socket.on("reservation",reservDB)
})