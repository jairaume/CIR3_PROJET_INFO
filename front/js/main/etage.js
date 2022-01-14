let etageObj = new Object();

etageObj = {
    etage0 : {
        img : "<img id='map' src='https://media.discordapp.net/attachments/694801927808221224/931178143274909696/0.PNG' usemap='#etage0' class='map' name='etage0'>",
        salleEtage : [
            {shape:'poly', coords:[583, 284, 758, 283, 757, 437, 582, 474], name:"C304", reserve :true},
            {shape:'poly', coords:[596, 539, 713, 526, 725, 647, 610, 658], name:"B305", reserve :true},
            {shape:'poly', coords:[607, 658, 494, 670, 481, 552, 593, 539], name:"B304", reserve :true},
        ],
        map : "<map name='etage0' id='etage0'> </map>"    
    },

    etage1 : {
        img : "<img id='map' src='https://media.discordapp.net/attachments/694801927808221224/931178142264082513/1.png' usemap='#etage1' class='map' name='etage1'>",
        salleEtage : [
            {shape:'rect', coords:[406, 385, 534, 262], name:"C402", reserve :true},
            {shape:'rect', coords:[537, 385, 620, 263], name:"C403", reserve :true},
            {shape:'rect', coords:[624, 263, 707, 385], name:"C404", reserve :true},
            {shape:'rect', coords:[708, 262, 806, 409], name:"C405", reserve :true},
            {shape:'rect', coords:[809, 409, 905, 264], name:"C406", reserve :true},
            {shape:'poly', coords:[280, 263, 403, 262, 403, 385, 279, 383], name:"C401", reserve :true},
            {shape:'poly', coords:[538, 610, 526, 506, 461, 513, 471, 618], name:"B505", reserve :true},
            {shape:'poly', coords:[529, 504, 666, 491, 679, 594, 541, 609], name:"B506", reserve :true},
        ],
        map : "<map name='etage1' id='etage1'> </map>"    
    },

    etage2 : {
        img : "<img id='map' src='https://media.discordapp.net/attachments/694801927808221224/931178142561886218/2.png' usemap='#etage2' class='map' name='etage2'>",
        salleEtage : [
            { shape: "poly", coords: [153, 492, 154, 476, 216, 476, 215, 537, 125, 538, 126, 492], name: "A622",reserve :true},
            { shape: "rect", coords: [126, 540, 171, 606], name: "A624",reserve :true },
            { shape: "rect", coords: [172, 539, 215, 606], name: "A625" ,reserve :true},
            { shape: "rect", coords: [276, 251, 356, 380], name: "C601" ,reserve :true},
        ],
        map : "<map name='etage2' id='etage2'> </map>"    
    },

    etage3 : {
        img : "<img id='map' src='https://media.discordapp.net/attachments/694801927808221224/931178142788362250/3.png' usemap='#etage3' class='map' name='etage3'>",
        salleEtage : [ 
            {shape:'rect', coords:[ 75, 100, 179, 206 ], name:"A811", reserve :true},
            {shape:'rect', coords:[ 75, 206, 179, 277 ], name:"A812", reserve :false},
            {shape:'rect', coords:[ 75, 422, 178, 494 ], name:"A814", reserve :false},
            {shape:'rect', coords:[ 75, 494, 178, 567 ], name:"A815", reserve :false},
            {shape:'poly', coords:[ 75, 567, 212, 567, 221, 645, 75, 645 ], name:"A816", reserve :true},
            {shape:'poly', coords:[ 220, 561, 276, 554, 287, 637, 231, 643 ], name:"B801", reserve :true},
            {shape:'poly', coords:[ 283, 553, 431, 536, 442, 631, 295, 649 ], name:"B802", reserve :true},
            {shape:'poly', coords:[ 438, 535, 566, 521, 578, 615, 449, 631 ], name:"B803", reserve :true},
            {shape:'poly', coords:[ 569, 521, 669, 509, 683, 632, 582, 643 ], name:"B804", reserve :true}
        ],
        map : "<map name='etage3' id='etage3'> </map>"    
    },

    etage4 : {
        img : "<img id='map' src='https://media.discordapp.net/attachments/694801927808221224/931178143031652372/4.PNG' usemap='#etage4' class='map' name='etage4'>",
        salleEtage : [ // 900
            { shape: "rect", coords: [8, 433, 73, 533], name: "A903" ,reserve :true},
            { shape: "rect", coords: [ 8, 224, 74, 327], name: "A906" ,reserve :true},
            { shape: "rect", coords: [98, 84, 164, 221], name: "A913" ,reserve :true},
            { shape: "rect", coords: [99, 466, 164, 568], name: "A918",reserve :true },
          
            { shape: "poly", coords: [98, 574, 206, 573, 219, 689, 172, 696, 170, 676, 99, 675], name: "A919" ,reserve :true},
            { shape: "poly", coords: [720, 631, 747, 629, 766, 606, 858, 598, 867, 675, 705, 692, 704, 670, 725, 667], name: "C953" ,reserve :true},
            { shape: "poly", coords: [ 862, 597, 984, 584, 995, 661, 869, 674], name: "C954",reserve :true },
            { shape: "poly", coords: [983, 558, 1086, 546, 1106, 649, 1004, 662], name: "C955" ,reserve :true},
            { shape: "poly", coords: [910, 472, 1056, 454, 1083, 543, 923, 561], name: "C956" ,reserve :true},
        ],
        map : "<map name='etage4' id='etage4'> </map>"    
    },
}

socket.on('roomInfos',(data)=>{
    refresh(data)
})


let refresh = (data)=>{
    let actualInfosIs = actualInfos()
    let numeroEtage = actualInfosIs.actualfloor
    //initRoomInfos(data,etageObj["etage" + numeroEtage].salleEtage)
    /*
    $(document).ready(function () {
        let data2={};
        $('.map').maphilight({alwaysOn:true});
    });  
    */
    
    let imgRemove = document.getElementById('map')
    let insertImage = document.getElementById('mapContainer')
    if(imgRemove){
        imgRemove.remove()
    }
    let num = 'etage'+numeroEtage
    let etagenumber = etageObj["etage" + numeroEtage]
    insertImage.innerHTML = etagenumber.img
    insertImage.innerHTML += etagenumber.map
    //createRoomAreas(numeroEtage,etagenumber.salleEtage)
    //salleSettings(etagenumber.salleEtage)
    //updateAvailability(etagenumber.salleEtage)


    socket.emit("askSallesInformations", actualInfosIs.actualfloor, actualInfosIs.actualAnnee, actualInfosIs.actualMois, actualInfosIs.actualJour, actualInfosIs.actualHorraire)
    socket.on("getSallesInformations", (currentSalles)=>{
        $(document).ready(function () {
            let data={};
            $('.map').maphilight({alwaysOn:true});
        });
        initRoomInfos(data,currentSalles)
 
        createRoomAreas(document.getElementById('etages').value,currentSalles)
        salleSettings(currentSalles)
        updateAvailability(currentSalles)
    })
}


let actualInfos = () =>{
    let actualfloor = document.getElementById("etages").value
    let actualDate = new Date(calendrier.value)
    // Actualisation des champs jour,mois,année pour la DB
    let options = {day:"2-digit",month:"2-digit",year:"numeric"}     // options pour avoir la date en format : xx/xx/xxxx
    let dateForDB = actualDate.toLocaleDateString(undefined,options).split('/')
    let actualHorraire = document.getElementById("creneaux").value

    let obj = {
        actualfloor:actualfloor,
        actualJour:dateForDB[0],
        actualMois:dateForDB[1],
        actualAnnee:dateForDB[2],
        actualHorraire:actualHorraire
    }
    return obj
}