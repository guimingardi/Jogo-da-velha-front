const express = require('express')()
const server = require('http').Server(express)
const io = require('socket.io')(server)
const port = 3000

let jogoStatus = {
   jogador1: "",
   jogador2: "",
   jogadas: 0
}

io.on('connection', function(socket){
  console.log(`Tentativa de conexão`)
  socket.on('jogo_acao', function(msg) {
    
    if(msg.tipo === 'nome' && jogoStatus.jogador1 === '') {
      jogoStatus.jogador1 = msg.dado

      io.emit('socket_msg', {
        tipo: 'jogador1',
        dado: msg.dado
      });
    } else if(msg.tipo === 'nome' && jogoStatus.jogador1 !== '') {
      jogoStatus.jogador2 = msg.dado
    }

    if(msg.tipo === 'jogada') {
      io.emit('socket_msg', {
        tipo: 'jogada',
        dado: msg.dado
      });
    }

  });
})

server.listen(port, function(){
  console.log('listening on *:' + port);
})