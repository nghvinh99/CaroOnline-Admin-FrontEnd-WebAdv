import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersAPI } from '../../api/usersAPI';

const initialState = {
  users: [],
  filter: {
    search: '',
    sortBy: 'id',
    order: 'ASC',
  },
  status: 'idle',
  error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (filter, { rejectWithValue }) => {
  try {
    const response = await usersAPI.get(filter);
    return response;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const flipUserStatus = createAsyncThunk('users/flipUserStatus', async (userId, { rejectWithValue }) => {
  try {
    const response = await usersAPI.flipStatus(userId);
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
    usersFilter: (state, action) => {
      const filter = action.payload;
      return {
        ...state,
        filter: filter
      }
    },
    updateUserStatus: (state, action) => {
      const userId = action.payload;
      const users = state.users.map(user => {
        if (user.id === userId) {
          user.status = 1 - user.status;
        }
        return user;
      })
    }
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return {
        ...state,
        users: action.payload,
      }
    },
    [flipUserStatus.fulfilled]: (state, action) => {
      return {
        ...state
      }
    }
  }
})

export const { usersFilter, updateUserStatus } = usersSlice.actions;

export const selectAllUsers = state => state.users.users;

export const selectUserById = (state, userId) => state.users.users.find(user => user.id === userId);

export const selectFilter = state => state.users.filter;

export default usersSlice.reducer;