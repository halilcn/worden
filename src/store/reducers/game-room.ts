import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { IServerUser } from '../../types'

type userIdForGame = null | string

export interface IGameRoom {
  userIdToRequestForGame: userIdForGame
  userIdToIncomingForGame: userIdForGame
  activeUsers: IServerUser[]
}

const initialState: IGameRoom = {
  userIdToRequestForGame: null,
  userIdToIncomingForGame: null,
  activeUsers: [],
}

export const gameRoom = createSlice({
  initialState,
  name: 'gameRoom',
  reducers: {
    setUserIdToRequestForGame: (state, action: PayloadAction<userIdForGame>) => {
      state.userIdToRequestForGame = action.payload
    },
    setActiveUsers: (state, action: PayloadAction<IServerUser[]>) => {
      state.activeUsers = action.payload
    },
  },
})

export const gameRoomActions = gameRoom.actions
export default gameRoom.reducer
