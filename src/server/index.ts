import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import { SOCKET_CHANNELS } from '../constants'
import { IServerUser } from '../types'

const httpServer = createServer()
const io = new Server(httpServer)

console.log('server running...')

const users: IServerUser[] = []

io.on('connection', (socket: Socket) => {
  console.log('birisi geldi');



  socket.on(SOCKET_CHANNELS.LOGIN, (username: string) => {
    const alreadyExistsUsername = users.find(user => user.username === username)

    if (alreadyExistsUsername) {
      console.log('already exists')
      console.log(users)
      io.to(socket.id).emit(SOCKET_CHANNELS.ALREADY_EXIST_USERNAME)
      return
    }

    users.push({ username, socketId: socket.id })

    console.log('login oldu !')
    console.log(socket.id)
  })

  socket.on(SOCKET_CHANNELS.DISCONNECT, () => {
    console.log('DİSCONNECCT ÇAILIŞTI !')
  })

  //io.to(socket.id).emit();
})

httpServer.listen(3000)
