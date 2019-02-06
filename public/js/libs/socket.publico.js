//Comando para establecer la conexion
var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesk1 = $('#lblEscritorio1');
var lblDesk2 = $('#lblEscritorio2');
var lblDesk3 = $('#lblEscritorio3');
var lblDesk4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];

//Escucha cuanndo conectado
socket.on('connect', function() {
    console.log('Conectado al Servidor');
});

//Escucha cuando se desconecta
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});


socket.emit('lastTicket', null, function(lst) {
    updateHTML(lst.last4);
});

socket.on('last4', function(data) {
    var audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    updateHTML(data.last4);
});

function updateHTML(last4) {
    for (var index = 0; index <= last4.length - 1; index++) {
        lblTickets[index].text('Ticket ' + last4[index].number);
        lblDesks[index].text('Escritorio ' + last4[index].desk);
    }
}