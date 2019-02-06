//Comando para establecer la conexion

var socket = io();

var label = $('#lblNuevoTicket');

//Escucha cuanndo conectado
socket.on('connect', function() {
    console.log('Conectado al Servidor');
    socket.emit('lastTicket', null, function(data) {
        label.text(data.ticket);
    });
})

//Escucha cuando se desconecta
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
})

//listener que escuche estado actual

$('button').on('click', function() {
    //Enviar informacion.
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});