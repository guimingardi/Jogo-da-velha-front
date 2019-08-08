const express = require('express')()
const server = require('http').Server(express)
const io = require('socket.io')(server)
const port = 3000


// to com dificuldade

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

      console.log('jogador 1', jogoStatus.jogador1)
    } else if(msg.tipo === 'nome' && jogoStatus.jogador1 !== '') {
      jogoStatus.jogador2 = msg.dado
      console.log('jogador 2', jogoStatus.jogador2)
    }

    if(msg.tipo === 'novo_jogo'){
      jogoStatus = {
        jogador1: "",
        jogador2: "",
        jogadas: 0
     }
    }



    // verificar tipo de mensagem (nome|joga)
    // se tipo for nome
      // verifica se ja tem jogador
      // atualiza o nome jogador

    // se tipo for jogada
    // atualiza quantidade de jogada

  });
})

server.listen(port, function(){
  console.log('listening on *:' + port);
})