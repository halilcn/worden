import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

export interface ISocketServer {
  server: any
}

const initialState: ISocketServer = {
  server: null,
}

export const socketServer = createSlice({
  initialState,
  name: 'socketServer',
  reducers: {
    setServer: (state, action: PayloadAction<Socket>) => {
      state.server = action.payload
    },
    deleteServer: state => {
      state.server = null
    },
  },
})

export const socketServerActions = socketServer.actions
export default socketServer.reducer
