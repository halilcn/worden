import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import { SOCKET_CHANNELS } from '../constants'

const httpServer = createServer()
const io = new Server(httpServer)

console.log('server running...')

io.on('connection', (socket: Socket) => {
  socket.on(SOCKET_CHANNELS.LOGIN, (username: string) => {
    console.log('login oldu !')
    console.log(socket.id)
  })

  socket.on(SOCKET_CHANNELS.DISCONNECT, () => {
    console.log('DİSCONNECCT ÇAILIŞTI !')
  })

  //io.to(socket.id).emit();
})

httpServer.listen(3000)
