import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAuth {
  username: string;
}

const initialState: IAuth = {
  username: ''
};

export const auth = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    }
  }
});

export const authActions = auth.actions;
export default auth.reducer;
