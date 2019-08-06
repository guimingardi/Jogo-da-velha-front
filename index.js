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
  socket.on('jogo_acao', function(msg){

    // verificar tipo de mensagem (nome|joga)
    // se tipo for nome
      // verifica se ja tem jogador
      // atualiza o nome jogador

    // se tipo for jogada
    // atualiza quantidade de jogada


    console.log('jogo_acao: ' + msg);
  });
})

server.listen(port, function(){
  console.log('listening on *:' + port);
})