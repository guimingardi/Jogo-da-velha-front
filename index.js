const express = require('express')()
const server = require('http').Server(express)
const io = require('socket.io')(server)
const port = 3000

io.on('connection', function(socket){
  console.log(`Tentativa de conexão`)
})

server.listen(port, function(){
  console.log('listening on *:' + port);
})