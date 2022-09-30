import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { IServerUser } from '../../types'

type userIdForGame = null | string

export interface IGameRoom {
  roomId: string | null
  userSocketIdToRequestForGame: userIdForGame
  userSocketIdToIncomingForGame: userIdForGame
  activeUsers: IServerUser[]
}

const initialState: IGameRoom = {
  roomId: null,
  userSocketIdToRequestForGame: null,
  userSocketIdToIncomingForGame: null,
  activeUsers: [],
}

export const gameRoom = createSlice({
  initialState,
  name: 'gameRoom',
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload
    },
    setSocketUserIdToRequestForGame: (state, action: PayloadAction<userIdForGame>) => {
      state.userSocketIdToRequestForGame = action.payload
    },
    setSocketUserIdToIncomingForGame: (state, action: PayloadAction<userIdForGame>) => {
      state.userSocketIdToIncomingForGame = action.payload
    },
    setActiveUsers: (state, action: PayloadAction<IServerUser[]>) => {
      state.activeUsers = action.payload
    },
    leaveFromRoom: state => {
      state.userSocketIdToRequestForGame = null
      state.userSocketIdToIncomingForGame = null
    },
  },
})

export const gameRoomActions = gameRoom.actions
export default gameRoom.reducer
