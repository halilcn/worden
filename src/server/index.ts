import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer)

console.log('server running...');

io.on('connection', (socket: Socket) => {
  console.log('birisi geldi !')
  socket.on('test_channel', () => {
    console.log(socket.id);
    console.log('test channel okey')
  })

  //io.to(socket.id).emit();
})

httpServer.listen(3000)