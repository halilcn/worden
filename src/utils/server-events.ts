import { SOCKET_CHANNELS } from '../constants'
import store from '../store'
import { IAcceptGameRequest, ISendPointOfUser, ISendReadyStatusForGame } from '../types'

const server = store.getState().socketServer.server

const login = (username: string) => {
  server.emit(SOCKET_CHANNELS.LOGIN, username)
}

const logout = (username: string) => {
  server.emit(SOCKET_CHANNELS.LOGOUT, username)
}

const sendGameRequest = (userSocketId: string) => {
  server.emit(SOCKET_CHANNELS.SEND_GAME_REQUEST, userSocketId)
}

const cancelGameRequest = (userSocketId: string) => {
  server.emit(SOCKET_CHANNELS.CANCEL_GAME_REQUEST, userSocketId)
}

const acceptGameRequest = (payload: IAcceptGameRequest) => {
  server.emit(SOCKET_CHANNELS.ACCEPT_GAME_REQUEST, payload)
}

const sendReadyStatusForGame = (payload: ISendReadyStatusForGame) => {
  server.emit(SOCKET_CHANNELS.SEND_READY_STATUS_FOR_GAME, payload)
}

const loginGameRoom = (roomId: string) => {
  server.emit(SOCKET_CHANNELS.LOGIN_GAME_ROOM, roomId)
}

const gameStarting = (roomId: string) => {
  server.emit(SOCKET_CHANNELS.GAME_STARTING, roomId)
}

const sendPointOfUser = (payload: ISendPointOfUser) => {
  server.emit(SOCKET_CHANNELS.SEND_POINT_OF_USER, payload)
}

const disconnect = () => {
  server.disconnect()
}

export default {
  login,
  disconnect,
  logout,
  sendGameRequest,
  cancelGameRequest,
  acceptGameRequest,
  loginGameRoom,
  sendReadyStatusForGame,
  gameStarting,
  sendPointOfUser,
}
