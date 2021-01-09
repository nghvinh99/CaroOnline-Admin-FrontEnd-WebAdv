import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersAPI } from '../../api/usersAPI';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (rejectWithValue) => {
  try {
    const response = await usersAPI.get(process.env.REACT_APP_API + '/users');
    return response;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

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
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return {
        ...state,
        users: action.payload,
      }
    }
  }
})

export const { blockUser } = usersSlice.actions;

export const selectAllUsers = state => state.users.users;

export const selectUserById = (state, userId) => {
  state.users.users.find(user => user.id === userId);
}

export default usersSlice.reducer;