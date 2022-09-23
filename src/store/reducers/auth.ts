import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface auth {
  username: string;
}

const initialState: auth = {
  username: ''
};

interface ISetUsername {
  username: string;
}

export const auth = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUsername: (state, { payload }: PayloadAction<ISetUsername>) => {
      state.username = payload.username;
    }
  }
});

export const authActions = auth.actions;
export default auth.reducer;
