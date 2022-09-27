import { SOCKET_CHANNELS } from '../constants'
import store from '../store'

const server = store.getState().socketServer.server

const alreadyExistUsername = (listener: () => void) => {
  return server.on(SOCKET_CHANNELS.ALREADY_EXIST_USERNAME, listener)
}

export default {
  alreadyExistUsername,
}
