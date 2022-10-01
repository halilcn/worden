import { configureStore } from '@reduxjs/toolkit'

import auth from './reducers/auth'
import game from './reducers/game'
import gameRoom from './reducers/game-room'
import socketServer from './reducers/socket-server'

const store = configureStore({
  reducer: {
    auth,
    gameRoom,
    game,
    socketServer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch
