import { SOCKET_CHANNELS } from '../constants'
import store from '../store'

const server = store.getState().socketServer.server

const alreadyExistUsername = (listener: () => void) => {
  return server.on(SOCKET_CHANNELS.ALREADY_EXIST_USERNAME, listener)
}

const correctUsernameToLogin = (listener: () => void) => {
  return server.on(SOCKET_CHANNELS.CORRECT_USERNAME_TO_LOGIN, listener)
}

export default {
  alreadyExistUsername,
  correctUsernameToLogin,
}
