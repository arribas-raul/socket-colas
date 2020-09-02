
//Comando para establecer la conexión
var socket = io();

var searchParams = new URLSearchParams( window.location.search );

if(!searchParams.has('escritorio')){
     window.location = 'index.html';
     throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

let label = $('small');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

//Escuchar sucesos
socket.on('connect', function(){
     console.log('Conectado al servidor');
});

$('button').on('click', function(){
     socket.emit('atenderTicket', { escritorio: escritorio }, function(resp){
          //console.log(resp);

          if(resp === 'No hay tickets'){
               alert(resp);
               label.text(resp);
               return;
          }
          
          label.text('Ticket ' + resp.numero);
     });
});