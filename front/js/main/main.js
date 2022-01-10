let disconnectbtn = document.getElementById("disconnectBtn");

disconnectbtn.addEventListener('click',()=>{
    console.log("Je veux me pendre !")
    socket.emit('leave');
    window.location.reload();
})