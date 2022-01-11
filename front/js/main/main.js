let mapEtage8 = document.getElementById("etage8")
let imgEtage8 = document.getElementById("imgEtage8")
let salleEtage8 = document.getElementsByClassName("etage8")
let roomName = document.getElementById("roomName")
let roomInfos = document.getElementById("roomInfos")
roomInfos.style.position = "absolute"
roomInfos.style.zIndex = "9999"

let areasEtage8 = [
    {shape:'rect', coords:[64,85,152,175], name:"A811", reserver :true},
    {shape:'rect', coords:[64,175,152,235], name:"A812", reserver :false},
    {shape:'rect', coords:[64,238,152,295], name:"A813", reserver :false},
    {shape:'rect', coords:[64,358,151,419], name:"A814", reserver :false},
    {shape:'rect', coords:[64,419,151,481], name:"A815", reserver :false},
    {shape:'poly', coords:[64,481, 180,481, 188,547, 64,547], name:"A816", reserver :true},
    {shape:'poly', coords:[187,476, 234,470, 244,540, 196,545], name:"A817", reserver :true},
    {shape:'poly', coords:[240,469, 366,455, 375,535, 250,550], name:"A818", reserver :true},
    {shape:'poly', coords:[372,454, 480,442, 490,522, 381,535], name:"A819", reserver :true},
    {shape:'poly', coords:[483,442, 567,432, 579,536, 494,545], name:"A820", reserver :true}
]
//console.log(imgEtage8.size);
//console.log(makeSVGfromMap(mapEtage8,false,imgEtage8.width,655,0.5,1,silver,gray,black))


function createRoomAreas(){
    areasEtage8.forEach(e => {
        let tmpArea = document.createElement('area')
        if(e.reserver == true){
            cvi_map.modify(imgEtage8, {bordercolor:'#FF0000'})
            tmpArea.classList.add("etage8", "iborderFF0000","icolor101010","iopacity10","iradius70")
        }
        else{
            tmpArea.classList.add("etage8", "iborder00FF00","icolor101010","iopacity10","iradius70")
        }
        tmpArea.setAttribute('shape', e.shape)
        tmpArea.setAttribute('coords', e.coords)
        tmpArea.setAttribute('id',e.name)
        mapEtage8.appendChild(tmpArea)

    });

}


createRoomAreas();

for (const salle of salleEtage8) {
    salle.addEventListener('mouseover',()=>{
        roomInfos.style.visibility="visible"
        roomName.innerHTML = salle.getAttribute('id')
    })
    salle.addEventListener('mouseleave',()=>{
        roomInfos.style.visibility="hidden"
    })
    salle.addEventListener('mousemove',(e)=>{
        let left = e.offsetX;
        let top = e.offsetY;
        roomInfos.style.left = left + 'px';
        roomInfos.style.top = top+120 + 'px';
    })
}


showCoords()