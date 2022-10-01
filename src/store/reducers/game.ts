import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { IGameAccepted, IServerUser } from '../../types'

interface IPlayer {
  userSocketId: string
  username: string
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
      const { playerOne, playerTwo } = action.payload

      state.players = [
        {
          userSocketId: playerOne.socketId,
          username: playerOne.username,
          point: 0,
        },
        {
          userSocketId: playerTwo.socketId,
          username: playerTwo.username,
          point: 0,
        },
      ]
    },
  },
})

export const gameActions = game.actions
export default game.reducer
