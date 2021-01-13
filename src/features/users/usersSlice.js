import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersAPI } from '../../api/usersAPI';

const initialState = {
  users: [],
  filter: {
    search: '',
    sortBy: 'id',
    order: 'ASC',
  },
  user: {},
  status: 'idle',
  error: null,
  state: '',
  blockStatus: '',
  blockOneUserStatus: '',
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (filter, { rejectWithValue }) => {
  try {
    const response = await usersAPI.get(filter);
    return response;
  } catch (err) {
    localStorage.clear();
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const fetchUser = createAsyncThunk('users/fetchUser', async (userId, { rejectWithValue }) => {
  try {
    const response = await usersAPI.getSingle(userId);
    return response;
  } catch (err) {
    localStorage.clear();
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
    localStorage.clear();
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
        if (parseInt(user.id) === parseInt(userId)) {
          user.status = 1 - user.status;
          if (user.status === 1) {
            state.blockStatus = 'unblocked';
          } else {
            state.blockStatus = 'blocked';
          }
        }
        return user;
      })
      state.users = users;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.state = 'OK';
    },
    [fetchUsers.pending]: (state, action) => {
      state.state = 'Pending'
    },
    [flipUserStatus.fulfilled]: (state, action) => {
      const res = action.payload;
      if (res) {
        const val = 1 - state.user.status;
        state.user.status = val;
        if (val === 1) {
          state.blockOneUserStatus = 'unblocked';
        } else {
          state.blockOneUserStatus = 'blocked';
        }
      }
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.state = 'OK';
    },
    [fetchUser.pending]: (state, action) => {
      state.state = 'Pending';
    }
  }
})

export const { usersFilter, updateUserStatus, setCurrentUser } = usersSlice.actions;

export const selectAllUsers = state => state.users.users;

export const selectUserById = (state, userId) => state.users.users.find(user => user.id === userId);

export const selectUser = state => state.users.user;

export const selectFilter = state => state.users.filter;

export default usersSlice.reducer;