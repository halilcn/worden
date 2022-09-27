import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'
import io from 'socket.io-client'

import { SOCKET_SERVER_URL } from '../../constants'

export interface ISocketServer {
  server: Socket
}

const initialState: ISocketServer = {
  server: io(SOCKET_SERVER_URL, { transports: ['websocket'] }),
}

export const socketServer = createSlice({
  initialState,
  name: 'socketServer',
  reducers: {},
})

export const socketServerActions = socketServer.actions
export default socketServer.reducer
