//Comando para establecer la conexion

var socket = io();

var searchParams = new URLSearchParams(window.location.search);
var label = $('small');

if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var desk = searchParams.get('desk');
$('h1').text('Escritorio: ' + desk);

$('button').on('click', function() {
    socket.emit('attendTicket', { desk: desk }, function(resp) {
        if (resp === 'No hay tickets') {
            alert(resp);
            label.text(resp);
            return;
        }
        label.text('Ticket N°: ' + resp.number);
    });
});

//Escucha cuanndo conectado
socket.on('connect', function() {
    console.log('Conectado al Servidor');
})

//Escucha cuando se desconecta
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
})