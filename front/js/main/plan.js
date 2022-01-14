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

let etages = [0,1,2,3,4]

/* ------------- Creneau actuel --------------- */
//let body = document.getElementsByTagName("body")[0]
let reservationDiv = document.getElementById("reservationDiv")
let div = document.createElement("div")



/* ------------- Balise de la reservation --------------- */

// Date du jour affichée
let reservDiv = document.createElement("div")
reservDiv.classList.add('flexbox')
let dateText = `${days[dayNumberOfWeek-1]} ${dayNumberOfMonth} ${months[month]} ${years}`;

// Input des différents créneaux
let option
for(creneau of creneaux){ // On passe dans les 4 différents créneaux du tableau "créneaux"
    let valeurs = `${creneau[0].hour}h${creneau[0].min}-${creneau[1].hour}h${creneau[1].min}` // Différentes valeurs du créneau actuel
    if(creneau == creneaux.at(0) && (hours<creneaux.at(0)[0].hour||hours==creneaux.at(0)[0].hour && mins<creneaux.at(0)[0].min)){
        option += "<option selected>" // On selectionne par défaut ce créneau
        reservDB.horraire=valeurs
    }else if(creneau == creneaux.at(creneaux.length-1) && (hours>creneaux.at(creneaux.length-1)[1].hour||hours==creneaux.at(creneaux.length-1)[1].hour && mins>creneaux.at(creneaux.length-1)[1].min)){
        option += "<option selected>" // On selectionne par défaut ce créneau
        reservDB.horraire=valeurs
    }else if(creneau[0].hour <= hours && creneau[1].hour > hours){ // Si l'heure min du créneau <= à l'heure actuelle et l'heure max > à l'heure actuelle
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

let dateTextDiv = "<div id='dateText' class='flexbox'>"+dateText+"</div>"
let creneauDiv = "<div class='flexbox'><p>Creneau :</p> <select id='creneaux'>"+option+"</select></div>"
let etageDiv = "<div class='flexbox'><p>Etage : </p><select id='etages'>"+option2+"</select></div>"

            
reservDiv.innerHTML= dateTextDiv+creneauDiv+etageDiv

/* ------------- Balise du calendrier --------------- */
let calendrierDiv = document.createElement("div")
calendrierDiv.classList.add('flexbox')
calendrierDiv.innerHTML="<div class='flexbox'><p>Date de la reservation :</p></div>"

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
let infoButton = '<button id="infos" class="button"> Infos envoyées à DB</button>'
infoDiv.innerHTML = infoButton

infoDiv.addEventListener("click",event=>{
    event.preventDefault()
})

// Bouton "Envoyer à la DB"
let boutonDB = '<button id="reservation" class="button">Reserver cette salle</button>'
reservDiv.innerHTML+=boutonDB

reservationDiv.appendChild(reservDiv)
reservationDiv.appendChild(calendrierDiv)

//reservationDiv.appendChild(infoDiv) // a suppr

/* ------------- Actualisation des champs lors d'interactions --------------- */

reservDB.horraire = document.getElementById('creneaux').value

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

function divAlert(text,success){
    if(success){
        $("#alertDiv").addClass("success")
        $("#alertDiv").removeClass("echec")
    }
    else{
        $("#alertDiv").addClass("echec")
        $("#alertDiv").removeClass("success")
    }
    $("#alertDiv").html(!success?'<i class="fas fa-exclamation-triangle"></i>' + text + '<i class="fas fa-exclamation-triangle"></i>': '<i class="far fa-check-circle"></i>'+text+'<i class="far fa-check-circle"></i>');
    $("#alertDiv").addClass("show")
    $("#alertDiv").removeClass("hide")

    setTimeout(()=>{
        $("#alertDiv").removeClass("show")
        $("#alertDiv").addClass("hide")
    },3000)
}

// Interaction avec le bouton "Reserver cette salle"
document.getElementById("reservation").addEventListener("click",event=>{
    event.preventDefault()
    let problems = {salle:false,jour:false,mois:false,annee:false,horraire:false}
    let isConnected
    socket.emit("askIsConnected")
    socket.once("respondIsConnected", respondIsConnected => {
        isConnected=respondIsConnected
        // Vérification de la validté de chaque élément envoyé à la DB
        if(!reservDB.salle) problems.salle=true
        else if(reservDB.salle.length != 4) problems.salle=true
        
        if(!reservDB.jour) problems.jour=true
        if(!reservDB.mois) problems.mois=true
        if(!reservDB.annee) problems.annee=true
        if(!reservDB.horraire) problems.horraire=true
    
        if(problems.salle){divAlert("Veuillez indiquer une salle à réserver.",false);explode(event.pageX, event.pageY);}
        else if(problems.jour) {divAlert("Veuillez indiquer un jour à réserver.",false);explode(event.pageX, event.pageY);}
        else if(problems.mois){ divAlert("Veuillez indiquer un mois à réserver.",false);explode(event.pageX, event.pageY);}
        else if(problems.annee){ divAlert("Veuillez indiquer une année à réserver.",false);explode(event.pageX, event.pageY);}
        else if(problems.horraire) {divAlert("Veuillez indiquer un horraire à réserver.",false);explode(event.pageX, event.pageY);}
        else if(!isConnected) {divAlert("Veuillez vous connecter avant de faire une reservation.",false);explode(event.pageX, event.pageY);}
        else {
            launchConfetti();
            divAlert("Votre salle "+ reservDB.salle + " a été réservée avec succès !",true)
            socket.emit("createReservation",reservDB)
            socket.emit('roomCaracteristiques')
            reservDB.salle = undefined;
        }
    })
})
socket.on('reservationCreated',()=>{
    socket.emit('roomCaracteristiques')
})

// Interaction avec le bouton "etages"
document.getElementById("etages").addEventListener("change",event=>{
    let newEtage = document.getElementById("etages").value;
    socket.emit('roomCaracteristiques')
})

// Interaction avec le bouton "creneau"
document.getElementById("creneaux").addEventListener("change",event=>{
   reservDB.horraire = document.getElementById("creneaux").value

    let newEtage = document.getElementById("etages").value;
    socket.emit('roomCaracteristiques')
})

document.getElementById("calendrier").addEventListener("change",event=>{
    reservDB.date = document.getElementById("calendrier").value
 
     socket.emit('roomCaracteristiques')
 })

function launchConfetti(){
    startConfetti(); 
    confettiPlay()   
    setTimeout(()=>{
        stopConfetti();
    },3000)
}
