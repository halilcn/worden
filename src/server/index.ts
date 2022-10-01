import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import { SOCKET_CHANNELS } from '../constants'
import { ActiveUserStatus, IAcceptGameRequest, IGameRoom, IServerUser } from '../types'

const httpServer = createServer()
const io = new Server(httpServer)

console.log('server running...')

let users: IServerUser[] = []
let gameRoom: IGameRoom[] = []

io.on('connection', (socket: Socket) => {
  console.log('birisi geldi')

  socket.on(SOCKET_CHANNELS.LOGIN, (username: string) => {
    const alreadyExistsUsername = users.find(user => user.username === username)

    if (alreadyExistsUsername) {
      console.log('already exists')
      console.log(users)
      io.to(socket.id).emit(SOCKET_CHANNELS.ALREADY_EXIST_USERNAME)
      return
    }

    users.push({ username, socketId: socket.id, status: ActiveUserStatus.IDLE })

    io.to(socket.id).emit(SOCKET_CHANNELS.CORRECT_USERNAME_TO_LOGIN, socket.id)
    io.emit(SOCKET_CHANNELS.ACTIVE_USERS, users)

    console.log('login selam!')
    console.log(socket.id)
  })

  socket.on(SOCKET_CHANNELS.SEND_GAME_REQUEST, (fromSocketId: string) => {
    users.map(user => {
      if (user.socketId === fromSocketId || user.socketId === socket.id) user.status = ActiveUserStatus.BUSY
      return user
    })

    io.to(fromSocketId).emit(SOCKET_CHANNELS.INCOMING_GAME_REQUEST, socket.id)
    io.emit(SOCKET_CHANNELS.ACTIVE_USERS, users)
  })

  socket.on(SOCKET_CHANNELS.CANCEL_GAME_REQUEST, (gameUserSocketId: string) => {
    users.map(user => {
      if (user.socketId === gameUserSocketId || user.socketId === socket.id) user.status = ActiveUserStatus.IDLE
      return user
    })

    console.log(gameUserSocketId)
    console.log(socket.id)

    io.emit(SOCKET_CHANNELS.ACTIVE_USERS, users)
    io.to(gameUserSocketId).to(socket.id).emit(SOCKET_CHANNELS.GAME_CANCELED)
  })

  socket.on(SOCKET_CHANNELS.ACCEPT_GAME_REQUEST, (payload: IAcceptGameRequest) => {
    console.log('accepted game! The game is starting....')

    const { roomId, gameUserSocketId } = payload
    const emitPayload = {
      roomId,
      playerOne: {
        socketId: payload.gameUserSocketId,
        username: users.find(user => user.socketId === payload.gameUserSocketId)?.username,
      },
      playerTwo: {
        socketId: socket.id,
        username: users.find(user => user.socketId === payload.gameUserSocketId)?.username,
      },
    }

    io.to(gameUserSocketId).emit(SOCKET_CHANNELS.GAME_ACCEPTED, emitPayload)
    io.to(socket.id).emit(SOCKET_CHANNELS.GAME_ACCEPTED, emitPayload)
  })

  socket.on(SOCKET_CHANNELS.LOGIN_GAME_ROOM, (roomId: string) => {
    socket.join(roomId)
    console.log('joined room !!!!')
  })

  socket.on(SOCKET_CHANNELS.LOGOUT, (username: string) => {
    console.log('logout geldi !!!')
    users = users.filter(user => user.username !== username)
    io.emit(SOCKET_CHANNELS.ACTIVE_USERS, users)
  })

  socket.on(SOCKET_CHANNELS.DISCONNECT, () => {
    console.log('DİSCONNECCT ÇAILIŞTI !')
  })

  //io.to(socket.id).emit();
})

httpServer.listen(3000)
