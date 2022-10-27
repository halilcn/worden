import { SOCKET_CHANNELS } from '../constants'
import store from '../store'
import { IGameAccepted, ISendPointOfUser, IServerUser } from '../types'

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

const gameCanceled = (listener: () => void) => {
  return server.on(SOCKET_CHANNELS.GAME_CANCELED, listener)
}

const gameAccepted = (listener: (game: IGameAccepted) => void) => {
  return server.on(SOCKET_CHANNELS.GAME_ACCEPTED, listener)
}

const readiedUser = (listener: (userSocketId: string) => void) => {
  return server.on(SOCKET_CHANNELS.READIED_USER, listener)
}

const gameStarted = (listener: (words: object) => void) => {
  return server.on(SOCKET_CHANNELS.GAME_STARTED, listener)
}

const pointOfUser = (listener: (payload: ISendPointOfUser) => void) => {
  return server.on(SOCKET_CHANNELS.POINT_OF_USER, listener)
}

const logoutGameRoom = (listener: () => void) => {
  return server.on(SOCKET_CHANNELS.LOGOUT_GAME_ROOM, listener)
}

export default {
  alreadyExistUsername,
  correctUsernameToLogin,
  activeUsers,
  incomingGameRequest,
  gameCanceled,
  gameAccepted,
  readiedUser,
  gameStarted,
  pointOfUser,
  logoutGameRoom,
}
