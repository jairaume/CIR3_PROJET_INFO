


socket.emit('getEvents');
socket.on('respondEvents',(dataEvents)=>{
    let test = [
        {
        id: "C304",
        resource: "C304",
        start: "2022-01-13T08:20:00",
        end: "2022-01-13T12:20:00",
        title: "admin admin"
        },
        {
        id: "B304",
        resource: "B304",
        start: "2022-01-13T15:50:00",
        end: "2022-01-13T17:50:00",
        title: "admin admin"
        }
        ]

    console.log(dataEvents)

let inst = mobiscroll.eventcalendar('#demo-remote-api', {
    locale: mobiscroll.localeFr,
    theme: 'ios',
    themeVariant: 'light',
    clickToCreate: false,
    dragToCreate: false,
    dragToMove: false,
    dragToResize: false,
    view: {
        timeline: { 
            type: 'day',
            startDay: 0,
            endDay: 6,
            startTime: '07:00',
            endTime: '20:00',
            timeCellStep: 60,
            timeLabelStep: 120
        }
    },
    resources : [
        {"id":"C304","name":"C304","color":"red"},{"id":"B304","name":"B304","color":"red"},{"id":"B305","name":"B305","color":"red"},{"id":"C401","name":"C401","color":"red"},{"id":"C402","name":"C402","color":"red"},{"id":"C403","name":"C403","color":"red"},{"id":"C404","name":"C404","color":"red"},{"id":"C405","name":"C405","color":"red"},{"id":"C406","name":"C406","color":"red"},{"id":"B506","name":"B506","color":"red"},{"id":"B505","name":"B505","color":"red"},{"id":"A622","name":"A622","color":"red"},{"id":"A624","name":"A624","color":"red"},{"id":"A625","name":"A625","color":"red"},{"id":"C601","name":"C601","color":"red"},{"id":"A811","name":"A811","color":"red"},{"id":"A812","name":"A812","color":"red"},{"id":"A814","name":"A814","color":"red"},{"id":"A815","name":"A815","color":"red"},{"id":"A816","name":"A816","color":"red"},{"id":"B801","name":"B801","color":"red"},{"id":"B802","name":"B802","color":"red"},{"id":"B803","name":"B803","color":"red"},{"id":"B804","name":"B804","color":"red"},{"id":"A903","name":"A903","color":"red"},{"id":"A906","name":"A906","color":"red"},{"id":"A913","name":"A913","color":"red"},{"id":"A918","name":"A918","color":"red"},{"id":"A919","name":"A919","color":"red"},{"id":"C953","name":"C953","color":"red"},{"id":"C954","name":"C954","color":"red"},{"id":"C955","name":"C955","color":"red"},{"id":"C956","name":"C956","color":"red"}],
        data: dataEvents
});
});
