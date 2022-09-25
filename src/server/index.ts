/*
* import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer)

console.log('running now!!');

io.on('connection', (socket: Socket) => {
  console.log('birisi geldi !')
  socket.on('test', () => {
    console.log('joined a user')
  })
})

httpServer.listen(3000)*/

console.log('selammmmm')
export default {}

/*const {PORT,ACTIONS} = require('./constants');
const http = require('http').createServer();
const io = require('socket.io')(http);

console.log(`Port: ${PORT}`)
console.log('server running...')

io.on('connection', socket => {
  socket.on(ACTIONS.JOIN_CHAT_ROOM, roomId => {
    console.log('joined a user')
    socket.join(roomId)
  });

  socket.on(ACTIONS.LEAVE_CHAT_ROOM, roomId => {
    socket.leave(roomId)
  });

  socket.on(ACTIONS.SEND_MESSAGE, payload => {
    io.to(payload.roomId).emit(ACTIONS.MESSAGE, payload);
  });

  socket.on('disconnect',  ()=> {
    console.log('disconnected a user');
  });
});

http.listen(PORT);
*/
