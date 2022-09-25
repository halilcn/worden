import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type userIdForGame = null | string

export interface IGameRoom {
  userIdToRequestForGame: userIdForGame
  userIdToIncomingForGame: userIdForGame
}

const initialState: IGameRoom = {
  userIdToRequestForGame: null,
  userIdToIncomingForGame: null,
}

export const gameRoom = createSlice({
  initialState,
  name: 'gameRoom',
  reducers: {
    setUserIdToRequestForGame: (state, action: PayloadAction<userIdForGame>) => {
      state.userIdToRequestForGame = action.payload
    },
  },
})

export const gameRoomActions = gameRoom.actions
export default gameRoom.reducer
