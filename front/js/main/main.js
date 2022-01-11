let mapEtage8 = document.getElementById("etage8")
let salleEtage8 = document.getElementsByClassName("etage8")
cvi_map.defaultAreacolor = '#00FF00'; //STR '#000000'-'#ffffff
let areasEtage8 = [
    {shape:'rect', coords:"64,85,152,175", name:"A811"},
    {shape:'rect', coords:"64,175,152,235", name:"A812"},
    {shape:'rect', coords:"64,238,152,295", name:"A813"},
    {shape:'rect', coords:"64,358,151,419", name:"A814"},
    {shape:'rect', coords:"64,419,151,481", name:"A815"},
    {shape:'poly', coords:"64,481, 180,481, 188,547, 64,547", name:"A816"},
    {shape:'poly', coords:"187,476, 234,470, 244,540, 196,545", name:"A817"},
    {shape:'poly', coords:"240,469, 366,455, 375,535, 250,550", name:"A818"},
    {shape:'poly', coords:"372,454, 480,442, 490,522, 381,535", name:"A819"},
    {shape:'poly', coords:"483,442, 567,432, 579,536, 494,545", name:"A820"}
]


function createRoomAreas(){
    areasEtage8.forEach(e => {
        let tmpArea = document.createElement('area')
        tmpArea.setAttribute('shape', e.shape)
        tmpArea.setAttribute('coords', e.coords)
        tmpArea.setAttribute('id',e.name)
        tmpArea.classList.add("etage8", "iborderFF0000","icolor101010","iopacity10","iradius70", "fillcolor00FF00")
        mapEtage8.appendChild(tmpArea)
    });

}


createRoomAreas();
console.log(salleEtage8[0])
salleEtage8[0].addEventListener('mouseover',()=>{
    console.log("jsuis au dessus d'une petite salle pas piqué des hannetons")
})





showCoords()