import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { GAME_ACTIVE_PAGE, IGameAccepted } from '../../types'

interface IAddPointOfUser {
  userSocketId: string
  point: number
}

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
  finishedPlayersSocketId: string[]
  activePage: GAME_ACTIVE_PAGE
}

//todo:game starting ? like actions ?

const initialState: IGame = {
  players: [],
  totalRound: 0,
  readyPlayersForCurrentGame: [],
  words: [],
  wordAnswers: [],
  wordUserAnswers: [],
  currentWordIndex: 0,
  finishedPlayersSocketId: [],
  activePage: GAME_ACTIVE_PAGE.ROOM,
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
    addFinishedUserSocketId: (state, action: PayloadAction<string>) => {
      if (!state.finishedPlayersSocketId.includes(action.payload)) state.finishedPlayersSocketId.push(action.payload)
    },
    setActivePage: (state, action: PayloadAction<GAME_ACTIVE_PAGE>) => {
      state.activePage = action.payload
    },
    addPointOfUser: (state, action: PayloadAction<IAddPointOfUser>) => {
      state.players.map(player => {
        if (player.userSocketId !== action.payload.userSocketId) return player

        player.point += action.payload.point
        return player
      })
    },
    finishGame: state => {
      state.words = []
      state.wordAnswers = []
      state.wordUserAnswers = []
      state.currentWordIndex = 0
    },
  },
})

export const gameActions = game.actions
export default game.reducer
