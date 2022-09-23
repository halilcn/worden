import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface auth {
  username: string;
}

const initialState: auth = {
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
