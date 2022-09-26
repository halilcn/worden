import { configureStore } from '@reduxjs/toolkit'

import auth from './reducers/auth'
import gameRoom from './reducers/game-room'
import socketServer from './reducers/socket-server'

const store = configureStore({
  reducer: {
    auth,
    gameRoom,
    socketServer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch
