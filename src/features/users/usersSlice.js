import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersAPI } from '../../api/usersAPI';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    blockUser: (state, action) => {
      const { userId } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.status = false;
      }
    }
  }
})

export const { blockUser } = usersSlice.actions;

export default usersSlice.reducer;

export const selectAllUsers = state => state.users.users;

export const selectUserById = (state, userId) => {
  state.users.users.find(user => user.id === userId);
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await usersAPI.get(process.env.REACT_APP_API + '/users')
  return response.users;
})