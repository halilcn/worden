import { SOCKET_CHANNELS } from '../constants'
import store from '../store'

const server = store.getState().socketServer.server

const login = (username: string) => {
  server.emit(SOCKET_CHANNELS.LOGIN, username)
}

const logout = (username: string) => {
  server.emit(SOCKET_CHANNELS.LOGOUT, username)
}

const sendGameRequest = (socketId: string) => {
  server.emit(SOCKET_CHANNELS.SEND_GAME_REQUEST, socketId)
}

const cancelGameRequest = (socketId: string) => {
  server.emit(SOCKET_CHANNELS.CANCEL_GAME_REQUEST, socketId)
}

const disconnect = () => {
  server.disconnect()
}

export default {
  login,
  disconnect,
  logout,
  sendGameRequest,
  cancelGameRequest
}
