import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { IGameAccepted, IServerUser } from '../../types'

interface IPlayer {
  userSocketId: string
  point: number
}

export interface IGame {
  players: IPlayer[]
  totalRound: number
}

const initialState: IGame = {
  players: [],
  totalRound: 0,
}

export const game = createSlice({
  initialState,
  name: 'game',
  reducers: {
    setPlayers: (state, action: PayloadAction<IGameAccepted>) => {
      state.players = [
        {
          userSocketId: action.payload.playerOne,
          point: 0,
        },
        {
          userSocketId: action.payload.playerTwo,
          point: 0,
        },
      ]
    },
  },
})

export const gameActions = game.actions
export default game.reducer
