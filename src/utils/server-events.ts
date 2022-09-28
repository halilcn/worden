import { SOCKET_CHANNELS } from '../constants'
import store from '../store'

const server = store.getState().socketServer.server

const login = (username: string) => {
  server.emit(SOCKET_CHANNELS.LOGIN, username)
}

const logout = (username: string) => {
  server.emit(SOCKET_CHANNELS.LOGOUT, username)
}

const disconnect = () => {
  server.disconnect()
}

export default {
  login,
  disconnect,
  logout,
}
