let switchBtn = document.getElementById('switchBtn')
let disconnectbtn = document.getElementById("disconnectBtn")
let s = true;
$('#calendarContainer').hide();

switchBtn.addEventListener('click',()=>{
    if(s){
        $('#container').hide();
        $('#calendarContainer').show();
        $('#demo-remote-api').css('visibility','visible');
    }
    else{
        $('#container').show();
        $('#calendarContainer').hide();
    }
    s = s?false:true;

    switchBtn.innerHTML = s ? '<i class="far fa-calendar-alt"></i>Calendrier' : '<i class="far fa-map"></i>Plan' ;
})