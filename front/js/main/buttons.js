let switchBtn = document.getElementById('switchBtn')
let disconnectbtn = document.getElementById("disconnectBtn")
let s = true;
$('#calendarContainer').hide();



disconnectbtn.addEventListener('click',()=>{
    console.log("Je veux me pendre !")
    socket.emit('leave');
    window.location.reload();
})

switchBtn.addEventListener('click',()=>{
    if(s){
        $('#container').hide();
        $('#calendarContainer').show();
    }
    else{
        $('#container').show();
        $('#calendarContainer').hide();
    }
    s = s?false:true;

    switchBtn.innerHTML = s ? '<i class="far fa-calendar-alt"></i>Calendrier' : '<i class="far fa-map"></i>Plan' ;
})