let etageObj = new Object();

etageObj = {
    etage0 : {
        img : "<img id='map' src='https://cdn.discordapp.com/attachments/930031345936261132/930822202729848882/red_de_chaussee.PNG' usemap='#etage0' class='map' name='etage0'>",
        salleEtage : [
            {shape:'poly', coords:[594, 295, 772, 294, 771, 453, 593, 492], name:"C304", reserve :true},
            {shape:'poly', coords:[607, 559, 727, 546, 739, 671, 622, 682], name:"B305", reserve :true},
            {shape:'poly', coords:[619, 682, 504, 695, 490, 573, 604, 559], name:"B304", reserve :true},
        ],
        map : "<map name='etage0' id='etage0'> </map>"    
    },
    etage8 : {
        img : "<img id='map' src='https://media.discordapp.net/attachments/783594798627160065/930115217734656040/unknown.png?width=958&height=655' usemap='#etage8' class='map' name='etage8'>",
        salleEtage : [
            {shape:'rect', coords:[64,85,152,175], name:"A811", reserve :true},
            {shape:'rect', coords:[64,175,152,235], name:"A812", reserve :false},
            {shape:'rect', coords:[64,238,152,295], name:"A813", reserve :false},
            {shape:'rect', coords:[64,358,151,419], name:"A814", reserve :false},
            {shape:'rect', coords:[64,419,151,481], name:"A815", reserve :false},
            {shape:'poly', coords:[64,481, 180,481, 188,547, 64,547], name:"A816", reserve :true},
            {shape:'poly', coords:[187,476, 234,470, 244,540, 196,545], name:"A817", reserve :true},
            {shape:'poly', coords:[240,469, 366,455, 375,535, 250,550], name:"A818", reserve :true},
            {shape:'poly', coords:[372,454, 480,442, 490,522, 381,535], name:"A819", reserve :true},
            {shape:'poly', coords:[483,442, 567,432, 579,536, 494,545], name:"A820", reserve :true}
        ],
        map : "<map name='etage8' id='etage8'> </map>"    
    }
}


let refresh = (numeroEtage)=>{
    let insertImage = document.getElementById('mapContainer')

    let num = 'etage'+numeroEtage
    console.log(num)
    let etagenumber = etageObj["etage" + numeroEtage]
    insertImage.innerHTML = etagenumber.img
    insertImage.innerHTML += etagenumber.map
    createRoomAreas(numeroEtage,etagenumber.salleEtage)
    salleSettings(etagenumber.salleEtage)
    updateAvailability(etagenumber.salleEtage)
}