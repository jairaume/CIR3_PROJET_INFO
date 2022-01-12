let mapEtage8 = document.getElementById("etage8")
let imgEtage8 = document.getElementById("imgEtage8")
let salleEtage8 = document.getElementsByClassName("etage8")
let roomName = document.getElementById("roomName")
// ATTENTION : balise <p id="roomInfos"> obsolète, voir équipe front concernant le plan
let roomInfos = document.getElementById("roomInfos")
roomInfos.style.position = "absolute"
roomInfos.style.zIndex = "9999"
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

}


createRoomAreas();

for (const salle of salleEtage8) {
    let tmpName = salle.getAttribute('name')
    let tmpId = salle.getAttribute('id')
    let tmpRes = salle.hasAttribute('reserve')

    salle.addEventListener('mouseover',()=>{
        if(!selected){
            currentRoom = tmpId;
            roomName.innerHTML = tmpId
        }


        console.log('#'+tmpName)
        $('#'+salle.getAttribute('name')).data('maphilight', tmpRes?occupiedhover:freehover).trigger('alwaysOn.maphilight');
    });

    salle.addEventListener('mouseleave',()=>{
        if((selected && currentRoom!=tmpId) || !selected){
            $('#'+salle.getAttribute('name')).data('maphilight', tmpRes?occupied:free).trigger('alwaysOn.maphilight');
        }
        else{
            $('#'+salle.getAttribute('name')).data('maphilight', tmpRes?occupiedselect:freeselect).trigger('alwaysOn.maphilight');
        }
    })

    salle.addEventListener('click',()=>{
        selected = true
        currentRoom = tmpId;
        for (const s of salleEtage8) {   
            $('#'+s.getAttribute('name')).data('maphilight', s.hasAttribute('reserve')?occupied:free).trigger('alwaysOn.maphilight');
        };
        $('#'+salle.getAttribute('name')).data('maphilight', tmpRes?occupiedselect:freeselect).trigger('alwaysOn.maphilight');
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
    
}
updateAvailability();
$(document).ready(function () {
    let data={};
    $('.map').maphilight({alwaysOn:true});
});  

showCoords()