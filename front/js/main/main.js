function createRoomAreas(numeroEtage,areasEtage){
    areasEtage.forEach(e => {
        let tmpArea = document.createElement('area')
        tmpArea.setAttribute('name',e.name)
        if(e.reserve == true){
            tmpArea.setAttribute('reserve',true)
        }
        tmpArea.classList.add("etage"+numeroEtage)
        tmpArea.setAttribute('shape', e.shape)
        tmpArea.setAttribute('coords', e.coords)
        tmpArea.setAttribute('id',e.name)
        
        document.getElementById("etage"+numeroEtage).appendChild(tmpArea)

    });

}

let salleSettings=(salleEtage)=>{
    let selected = "";
    let currentRoom = "";
    for (const salle of salleEtage) {
        let tmpName = salle.name
        let tmpRes = salle.reserve
        document.getElementById(salle.name).addEventListener('mouseover',()=>{
            if(!selected){
                currentRoom = tmpName;
                roomName.innerHTML = tmpName
            }
            console.log('#'+tmpName)
            $('#'+salle.name).data('maphilight', tmpRes?occupiedhover:freehover).trigger('alwaysOn.maphilight');
        });
        document.getElementById(salle.name).addEventListener('mouseleave',()=>{
            if((selected && currentRoom!=tmpName) || !selected){
                $('#'+salle.name).data('maphilight', tmpRes?occupied:free).trigger('alwaysOn.maphilight');
            }
            else{
                $('#'+salle.getAttribute('name')).data('maphilight', tmpRes?occupiedselect:freeselect).trigger('alwaysOn.maphilight');
            }
        })
        document.getElementById(salle.name).addEventListener('click',()=>{
            selected = true
            currentRoom = tmpName;
            for (const s of salleEtage) {   
                $('#'+s.getAttribute('name')).data('maphilight', s.hasAttribute('reserve')?occupied:free).trigger('alwaysOn.maphilight');
            };
            $('#'+salle.getAttribute('name')).data('maphilight', tmpRes?occupiedselect:freeselect).trigger('alwaysOn.maphilight');
            reservDB.salle=currentRoom
        })
    }
}

function updateAvailability(areasEtage){
    console.log(areasEtage)
    areasEtage.forEach(e => {
        if(e.reserve){
            $('#'+e.name).data('maphilight', occupied).trigger('alwaysOn.maphilight');
        }
        else{
            $('#'+e.name).data('maphilight', free).trigger('alwaysOn.maphilight');
        }
    });
}

let occupied = {
    alwaysOn:true,
    fillColor:'ff0000',
    strokeColor:'ff00000',
    strokeWidth:'2',
    fillOpacity:'0.2'
}
let free = {
    alwaysOn:true,
    fillColor:'00ff00',
    strokeColor:'00ff00',
    strokeWidth:'2',
    fillOpacity:'0.2'
}
let freehover = {
    alwaysOn:true,
    fillColor:'00ff00',
    strokeColor:'00ff00',
    strokeWidth:'2',
    fillOpacity:'0.5'
}
let occupiedhover = {
    alwaysOn:true,
    fillColor:'ff0000',
    strokeColor:'ff00000',
    strokeWidth:'2',
    fillOpacity:'0.5'
}
let freeselect= {
    alwaysOn:true,
    fillColor:'00ff00',
    strokeColor:'00ff00',
    strokeWidth:'2',
    fillOpacity:'0.7'
}
let occupiedselect = {
    alwaysOn:true,
    fillColor:'ff0000',
    strokeColor:'ff00000',
    strokeWidth:'2',
    fillOpacity:'0.7'
}