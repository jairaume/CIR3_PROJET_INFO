
socket.emit('roomCaracteristiques')

socket.on('roomInfos',(data)=>{
    initRoomInfos(data)
})