import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IAuth {
  username: string
  socketId: string
}

const initialState: IAuth = {
  username: '',
  socketId: '',
}

export const auth = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setSocketId: (state, action: PayloadAction<string>) => {
      state.socketId = action.payload
    },
  },
})

export const authActions = auth.actions
export default auth.reducer
