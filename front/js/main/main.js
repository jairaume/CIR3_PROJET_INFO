let occupied = {
    alwaysOn:true,
    fillColor:'e74c3c',
    strokeColor:'e74c3c',
    strokeWidth:'2',
    fillOpacity:'0.2'
}
let free = {
    alwaysOn:true,
    fillColor:'41bb78',
    strokeColor:'41bb78',
    strokeWidth:'2',
    fillOpacity:'0.2'
}
let freehover = {
    alwaysOn:true,
    fillColor:'41bb78',
    strokeColor:'41bb78',
    strokeWidth:'2',
    fillOpacity:'0.4'
}
let occupiedhover = {
    alwaysOn:true,
    fillColor:'e74c3c',
    strokeColor:'e74c3c',
    strokeWidth:'2',
    fillOpacity:'0.4'
}
let freeselect= {
    alwaysOn:true,
    fillColor:'41bb78',
    strokeColor:'41bb78',
    strokeWidth:'2',
    fillOpacity:'0.7'
}
let occupiedselect = {
    alwaysOn:true,
    fillColor:'e74c3c',
    strokeColor:'e74c3c',
    strokeWidth:'2',
    fillOpacity:'0.7'
}

let selected = "";
let currentRoom = "";
function envoyer(){
    return document.getElementById("etages").value;
}


function createRoomAreas(numeroEtage,areasEtage){
    document.getElementById("etage"+numeroEtage).innerHTML=""
    areasEtage.forEach(e => {
        let tmpArea = document.createElement('area')
        tmpArea.setAttribute('name',e.room)
        if(e.reserve == true){
            tmpArea.setAttribute('reserve',true)
        }
        tmpArea.classList.add("etage"+numeroEtage)
        tmpArea.setAttribute('shape', e.shape)
        tmpArea.setAttribute('coords', e.coords)
        tmpArea.setAttribute('id',e.room)
        document.getElementById("etage"+numeroEtage).appendChild(tmpArea)
    });
}

let salleSettings=(salleEtage)=>{

    for (const salle of salleEtage) {
        let tmpName = salle.room
        let tmpRes = salle.reserve
        document.getElementById(salle.room).addEventListener('mouseover',()=>{
            if(!selected){
                currentRoom = tmpName;
            }
            $('#'+salle.room).data('maphilight', tmpRes?occupiedhover:freehover).trigger('alwaysOn.maphilight');
        });
        document.getElementById(salle.room).addEventListener('mouseleave',()=>{
            if((selected && currentRoom!=tmpName) || !selected){
                $('#'+salle.room).data('maphilight', tmpRes?occupied:free).trigger('alwaysOn.maphilight');
            }
            else{
                $('#'+salle.room).data('maphilight', tmpRes?occupiedselect:freeselect).trigger('alwaysOn.maphilight');
            }
        })
        document.getElementById(salle.room).addEventListener('click',()=>{
            selected = true
            currentRoom = tmpName;
            removeAllSelected(salleEtage)
            $("#"+tmpName+"Infos").addClass('selected')
            for (const s of salleEtage) {   
                $('#'+s.room).data('maphilight', s.reserve?occupied:free).trigger('alwaysOn.maphilight');
            };
            $('#'+salle.room).data('maphilight', tmpRes?occupiedselect:freeselect).trigger('alwaysOn.maphilight');
            if(!salle.reserve){
                selected = true;
                reservDB.salle = currentRoom
            }
            else{
                selected = false;
                reservDB.salle = null
            }
        })
    }
}


function updateAvailability(areasEtage){
    areasEtage.forEach(e => {
        if(e.reserve){
            $('#'+e.room).data('maphilight', occupied).trigger('alwaysOn.maphilight');
        }
        else{
            $('#'+e.room).data('maphilight', free).trigger('alwaysOn.maphilight');
        }
    });
}


function addDiv(room,areasEtage){
    let infoDiv = document.createElement('div')
    infoDiv.classList.add('salleList')
    let ind = areasEtage.findIndex((e)=>e.room == room.room)
    if(ind !=-1){
        infoDiv.classList.add(!areasEtage[ind].reserve?'free':'occupied')
    }
    infoDiv.id = room.room+"Infos"

    let nameSalle = document.createElement("h3")
    nameSalle.innerHTML = room.room;
 
    let infoSalle = document.createElement('div')
    infoSalle.classList.add('infos')

    let seatInfo = document.createElement('p')
    seatInfo.innerHTML = '<i class="fas fa-chair"></i>'+room.seats
    seatInfo.classList.add('info')

    let projectorInfo = document.createElement('p')
    projectorInfo.innerHTML = '<i class="fas fa-ruler-combined"></i>'+room.size+"m²"
    projectorInfo.classList.add('info')

    infoDiv.appendChild(nameSalle);
    infoSalle.appendChild(seatInfo);
    infoSalle.appendChild(projectorInfo);
    infoDiv.appendChild(infoSalle)
    modalContainer.appendChild(infoDiv);
}

function removeAllSelected(salleEtage){
    $('.salleList').removeClass('selected')
    for (const s of salleEtage) {   
        $('#'+s.room).data('maphilight', s.reserve?occupied:free).trigger('alwaysOn.maphilight');
    };
    updateAvailability(salleEtage);
}
function hoverRoom(room,areasEtage){
    let ind = areasEtage.findIndex((e)=>e.room == room)
    if(ind !=-1){
        $('#'+room).data('maphilight', !areasEtage[ind].reserve ?freehover:occupiedhover).trigger('alwaysOn.maphilight');
    }
}
function leaveRoom(room,areasEtage){
    let ind = areasEtage.findIndex((e)=>e.room == room)
    if(ind !=-1){
        $('#'+room).data('maphilight', !areasEtage[ind].reserve ?free:occupied).trigger('alwaysOn.maphilight');
    }
}
function selectRoom(room,areasEtage){
    removeAllSelected(areasEtage)
    let ind = areasEtage.findIndex((e)=>e.room == room)
    if(ind !=-1){
        $('#'+room).data('maphilight', !areasEtage[ind].reserve ?freeselect:occupiedselect).trigger('alwaysOn.maphilight');
    }
    return areasEtage[ind].reserve
}

function initRoomInfos(infosSalles,salleEtage){
    let modalContainer = document.getElementById('modalContainer')
    modalContainer.innerHTML="";

    for (const sa of infosSalles) {
        if(sa.floor == document.getElementById("etages").value){
            addDiv(sa,salleEtage);
            
            $('#'+sa.room+"Infos").mouseover(function(e){
                if((selected && sa.room != currentRoom) || !selected){
                    hoverRoom(sa.room,salleEtage)
                }
            })
            .mouseout(function(e) {
                if((selected && sa.room != currentRoom) || !selected){
                    leaveRoom(sa.room,salleEtage)
                }
            })
            .click(function(e) { 
                e.preventDefault(); 
                let ind = salleEtage.findIndex((e)=>e.room == sa.room)
                if(ind !=-1){
                    if(!salleEtage[ind].reserve){
                        selected = true;
                        currentRoom=sa.room
                        reservDB.salle = currentRoom
                        selectRoom(sa.room,salleEtage)
                        $(this).addClass('selected')
                    }
                    else{
                        currentRoom=undefined
                        selected = false;
                        reservDB.salle = undefined;
                        nanPlay();
                    }
                }
                
            });
        }
    };

}
