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
  readyPlayersForCurrentGame: string[]
  words: string[]
  wordAnswers: string[]
  wordUserAnswers: string[]
  currentWordIndex: number
}

const initialState: IGame = {
  players: [],
  totalRound: 0,
  readyPlayersForCurrentGame: [],
  words: [],
  wordAnswers: [],
  wordUserAnswers: [],
  currentWordIndex: 0,
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
    addReadyPlayer: (state, action: PayloadAction<string>) => {
      state.readyPlayersForCurrentGame.push(action.payload)
    },
    setWords: (state, action: PayloadAction<string[]>) => {
      state.words = action.payload
    },
    setWordAnswers: (state, action: PayloadAction<string[]>) => {
      state.wordAnswers = action.payload
    },
    increaseCurrentWordIndex: state => {
      state.currentWordIndex = state.currentWordIndex + 1
    },
    addWordUserAnswer: (state, action: PayloadAction<string>) => {
      state.wordUserAnswers.push(action.payload)
    },
  },
})

export const gameActions = game.actions
export default game.reducer
