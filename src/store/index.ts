import { configureStore } from '@reduxjs/toolkit'

import auth from './reducers/auth'
import gameRoom from './reducers/game-room'

const store = configureStore({
  reducer: {
    auth,
    gameRoom,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch
