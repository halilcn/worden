import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import { GAME_WORDS_LENGTH, SERVER_PORT, SOCKET_CHANNELS } from '../constants'
import { ActiveUserStatus, IAcceptGameRequest, IGameRoom, ISendPointOfUser, ISendReadyStatusForGame, IServerUser } from '../types'
import words from './words'

const httpServer = createServer()
const io = new Server(httpServer)

console.log('Socket server is running...')

let users: IServerUser[] = []

io.on('connection', (socket: Socket) => {
  socket.on(SOCKET_CHANNELS.LOGIN, (username: string) => {
    const alreadyExistsUsername = users.find(user => user.username === username)

    if (alreadyExistsUsername) {
      io.to(socket.id).emit(SOCKET_CHANNELS.ALREADY_EXIST_USERNAME)
      return
    }

    users.push({ username, socketId: socket.id, status: ActiveUserStatus.IDLE })

    io.to(socket.id).emit(SOCKET_CHANNELS.CORRECT_USERNAME_TO_LOGIN, socket.id)
    io.emit(SOCKET_CHANNELS.ACTIVE_USERS, users)
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

    io.emit(SOCKET_CHANNELS.ACTIVE_USERS, users)
    io.to(gameUserSocketId).to(socket.id).emit(SOCKET_CHANNELS.GAME_CANCELED)
  })

  socket.on(SOCKET_CHANNELS.ACCEPT_GAME_REQUEST, (payload: IAcceptGameRequest) => {
    const { roomId, gameUserSocketId } = payload
    const emitPayload = {
      roomId,
      playerOne: {
        socketId: payload.gameUserSocketId,
        username: users.find(user => user.socketId === payload.gameUserSocketId)?.username,
      },
      playerTwo: {
        socketId: socket.id,
        username: users.find(user => user.socketId === socket.id)?.username,
      },
    }

    io.to(gameUserSocketId).emit(SOCKET_CHANNELS.GAME_ACCEPTED, emitPayload)
    io.to(socket.id).emit(SOCKET_CHANNELS.GAME_ACCEPTED, emitPayload)
  })

  socket.on(SOCKET_CHANNELS.LOGIN_GAME_ROOM, (roomId: string) => {
    socket.join(roomId)
  })

  socket.on(SOCKET_CHANNELS.SEND_REQUEST_LOGOUT_GAME_ROOM, (roomId: string) => {
    io.to(roomId).emit(SOCKET_CHANNELS.LOGOUT_GAME_ROOM)

    const usersIdOnRoom = io.sockets.adapter.rooms.get(roomId)

    if (usersIdOnRoom) {
      for (const id of usersIdOnRoom) {
        users.map(user => {
          if (user.socketId === id) user.status = ActiveUserStatus.IDLE
          return user
        })
      }
    }

    socket.leave(roomId)
    io.emit(SOCKET_CHANNELS.ACTIVE_USERS, users)
  })

  socket.on(SOCKET_CHANNELS.SEND_READY_STATUS_FOR_GAME, (payload: ISendReadyStatusForGame) => {
    io.to(payload.roomId).emit(SOCKET_CHANNELS.READIED_USER, payload.userSocketId)
  })

  socket.on(SOCKET_CHANNELS.GAME_STARTING, (roomId: string) => {
    const turkishWords = Object.keys(words)
    const selectedRandomTurkishWords = turkishWords
      .map(x => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(a => a.x)
      .slice(0, GAME_WORDS_LENGTH)

    const randomWords: { [key: string]: string } = {}
    selectedRandomTurkishWords.forEach(word => (randomWords[word] = words[word]))

    io.to(roomId).emit(SOCKET_CHANNELS.GAME_STARTED, randomWords)
  })

  socket.on(SOCKET_CHANNELS.SEND_POINT_OF_USER, (payload: ISendPointOfUser) => {
    io.to(payload.roomId).emit(SOCKET_CHANNELS.POINT_OF_USER, payload)
  })

  socket.on(SOCKET_CHANNELS.DISCONNECT, () => {
    users = users.filter(user => user.socketId != socket.id)
    io.emit(SOCKET_CHANNELS.ACTIVE_USERS, users)
  })
})

httpServer.listen(SERVER_PORT)
