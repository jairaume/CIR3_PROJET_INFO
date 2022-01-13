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

let selected = "";
let currentRoom = "";
function envoyer(){
    return document.getElementById("etages").value;
}


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
                $('#'+salle.name).data('maphilight', tmpRes?occupiedselect:freeselect).trigger('alwaysOn.maphilight');
            }
        })
        document.getElementById(salle.name).addEventListener('click',()=>{
            selected = true
            currentRoom = tmpName;
            console.log("You selected the room "+currentRoom+" !")
            removeAllSelected(salleEtage)
            $("#"+tmpName+"Infos").addClass('selected')
            for (const s of salleEtage) {   
                $('#'+s.name).data('maphilight', s.reserve?occupied:free).trigger('alwaysOn.maphilight');
            };
            $('#'+salle.name).data('maphilight', tmpRes?occupiedselect:freeselect).trigger('alwaysOn.maphilight');
            reservDB.salle=currentRoom
        })
    }
}


function updateAvailability(areasEtage){
    areasEtage.forEach(e => {
        if(e.reserve){
            $('#'+e.name).data('maphilight', occupied).trigger('alwaysOn.maphilight');
        }
        else{
            $('#'+e.name).data('maphilight', free).trigger('alwaysOn.maphilight');
        }
    });
}


function addDiv(room){
    let infoDiv = document.createElement('div')
    infoDiv.classList.add('salleList')
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
        $('#'+s.name).data('maphilight', s.reserve?occupied:free).trigger('alwaysOn.maphilight');
    };
    updateAvailability();
}
function hoverRoom(room,areasEtage){
    console.log(areasEtage)
    let ind = areasEtage.findIndex((e)=>e.name == room)
    if(ind !=-1){
        $('#'+room).data('maphilight', !areasEtage[ind].reserve ?freehover:occupiedhover).trigger('alwaysOn.maphilight');
    }
}
function leaveRoom(room,areasEtage){
    let ind = areasEtage.findIndex((e)=>e.name == room)
    if(ind !=-1){
        $('#'+room).data('maphilight', !areasEtage[ind].reserve ?free:occupied).trigger('alwaysOn.maphilight');
    }
}
function selectRoom(room,areasEtage){
    removeAllSelected()
    let ind = areasEtage.findIndex((e)=>e.name == room)
    if(ind !=-1){
        $('#'+room).data('maphilight', !areasEtage[ind].reserve ?freeselect:occupiedselect).trigger('alwaysOn.maphilight');
    }
}

function initRoomInfos(infosSalles,salleEtage){
    let modalContainer = document.getElementById('modalContainer')
    console.log(infosSalles)

    for (const sa of infosSalles) {
        console.log(sa.floor + " et " + document.getElementById("etages").value)
        if(sa.floor == document.getElementById("etages").value){

            addDiv(sa);
            
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
                
                selected = true;
                currentRoom=sa.room
                console.log("You selected the room "+currentRoom+" !")
                
                selectRoom(sa.room,salleEtage)
                $(this).addClass('selected')
            });
        }
    };

}

/*
var inst = mobiscroll.eventcalendar('#demo-remote-api', {
    locale: mobiscroll.localeFr,
    theme: 'ios',
    themeVariant: 'light',
    clickToCreate: false,
    dragToCreate: false,
    dragToMove: false,
    dragToResize: false,
    view: {
        calendar: {
            labels: true
        }
    }
});
mobiscroll.eventcalendar('#demo-remote-api', {
    view: {
        timeline: {
            type: 'day'
        }
    }
})
mobiscroll.util.http.getJson('https://trial.mobiscroll.com/events/?vers=5', function (events) {
    inst.setEvents(events);
}, 'jsonp');
*/
