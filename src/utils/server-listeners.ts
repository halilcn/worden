import { SOCKET_CHANNELS } from '../constants'
import store from '../store'
import { IServerUser } from '../types'

const server = store.getState().socketServer.server

const alreadyExistUsername = (listener: () => void) => {
  return server.on(SOCKET_CHANNELS.ALREADY_EXIST_USERNAME, listener)
}

const correctUsernameToLogin = (listener: (socketId: string) => void) => {
  return server.on(SOCKET_CHANNELS.CORRECT_USERNAME_TO_LOGIN, listener)
}

const activeUsers = (listener: (activeUsers: IServerUser[]) => void) => {
  return server.on(SOCKET_CHANNELS.ACTIVE_USERS, listener)
}

const incomingGameRequest = (listener: (fromUserSocketId: string) => void) => {
  return server.on(SOCKET_CHANNELS.INCOMING_GAME_REQUEST, listener)
}

export default {
  alreadyExistUsername,
  correctUsernameToLogin,
  activeUsers,
  incomingGameRequest,
}
