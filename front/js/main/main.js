//const { disconnect } = require("mongoose")

let mapEtage8 = document.getElementById("etage8")
let imgEtage8 = document.getElementById("imgEtage8")
let salleEtage8 = document.getElementsByClassName("etage8")
let roomName = document.getElementById("roomName")
// ATTENTION : balise <p id="roomInfos"> obsolète, voir équipe front concernant le plan

let selected = "";
let currentRoom = "";

let areasEtage8 = [
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
]

function createRoomAreas(){
    areasEtage8.forEach(e => {
        let tmpArea = document.createElement('area')
        tmpArea.setAttribute('name',e.name)
        if(e.reserve == true){
            tmpArea.setAttribute('reserve',true)
        }
        tmpArea.classList.add("etage8")
        tmpArea.setAttribute('shape', e.shape)
        tmpArea.setAttribute('coords', e.coords)
        tmpArea.setAttribute('id',e.name)
        mapEtage8.appendChild(tmpArea)

    });
    console.log("areas created !")
}


createRoomAreas();

for (const salle of salleEtage8) {
    let tmpName = salle.getAttribute('name')
    let tmpId = salle.getAttribute('id')
    let tmpRes = salle.hasAttribute('reserve')

    salle.addEventListener('mouseover',()=>{
        if(!selected){
            currentRoom = tmpId;
            showRoomInfos(currentRoom)
        }
        //console.log('#'+tmpName)
        $('#'+tmpName).data('maphilight', tmpRes?occupiedhover:freehover).trigger('alwaysOn.maphilight');
    });

    salle.addEventListener('mouseleave',()=>{
        if((selected && currentRoom!=tmpId) || !selected){
            $('#'+tmpName).data('maphilight', tmpRes?occupied:free).trigger('alwaysOn.maphilight');
        }
        else{
            $('#'+tmpName).data('maphilight', tmpRes?occupiedselect:freeselect).trigger('alwaysOn.maphilight');
        }
    })

    salle.addEventListener('click',()=>{
        selected = true
        currentRoom = tmpId;
        console.log("You selected the room "+currentRoom+" !")
        
        removeAllSelected()
        $("#"+tmpName+"Infos").addClass('selected')
        showRoomInfos(currentRoom)
        for (const s of salleEtage8) {   
            $('#'+s.getAttribute('name')).data('maphilight', s.hasAttribute('reserve')?occupied:free).trigger('alwaysOn.maphilight');
        };
        $('#'+tmpName).data('maphilight', tmpRes?occupiedselect:freeselect).trigger('alwaysOn.maphilight');
    })
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

function updateAvailability(){
    areasEtage8.forEach(e => {
        if(e.reserve){
            $('#'+e.name).data('maphilight', occupied).trigger('alwaysOn.maphilight');
        }
        else{
            $('#'+e.name).data('maphilight', free).trigger('alwaysOn.maphilight');
        }
    });
}

function showRoomInfos(room){
    //roomName.innerHTML = room
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
function removeAllSelected(){
    $('.salleList').removeClass('selected')
    for (const s of salleEtage8) {   
        $('#'+s.getAttribute('name')).data('maphilight', s.hasAttribute('reserve')?occupied:free).trigger('alwaysOn.maphilight');
    };
    updateAvailability();
}
function hoverRoom(room){
    let ind = areasEtage8.findIndex((e)=>e.name == room)
    if(ind !=-1){
        $('#'+room).data('maphilight', !areasEtage8[ind].reserve ?freehover:occupiedhover).trigger('alwaysOn.maphilight');
    }
}
function leaveRoom(room){
    let ind = areasEtage8.findIndex((e)=>e.name == room)
    if(ind !=-1){
        $('#'+room).data('maphilight', !areasEtage8[ind].reserve ?free:occupied).trigger('alwaysOn.maphilight');
    }
}
function selectRoom(room){
    removeAllSelected()
    let ind = areasEtage8.findIndex((e)=>e.name == room)
    if(ind !=-1){
        $('#'+room).data('maphilight', !areasEtage8[ind].reserve ?freeselect:occupiedselect).trigger('alwaysOn.maphilight');
    }
}

function initRoomInfos(infosSalles){
    let modalContainer = document.getElementById('modalContainer')
    console.log(infosSalles)

    for (const sa of infosSalles) {
        addDiv(sa);

        $('#'+sa.room+"Infos").mouseover(function(e){
            if((selected && sa.room != currentRoom) || !selected){
                hoverRoom(sa.room)
            }
        })
        .mouseout(function(e) {
            if((selected && sa.room != currentRoom) || !selected){
                leaveRoom(sa.room)
            }
        })
        .click(function(e) { 
            e.preventDefault(); 

            selected = true;
            currentRoom=sa.room
            console.log("You selected the room "+currentRoom+" !")

            selectRoom(sa.room)
            $(this).addClass('selected')
        });
    };

}
updateAvailability();
$(document).ready(function () {
    let data={};
    $('.map').maphilight({alwaysOn:true});
});  

showCoords()
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
