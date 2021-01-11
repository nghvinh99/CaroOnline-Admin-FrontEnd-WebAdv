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

export const blockUsers = createAsyncThunk('users/blockUser', async (rejectWithValue) => {
  try {
    const reponse = await usersAPI.block(userId);
    console.log(response);
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
      const userId = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.status = false;
      }
    },
    usersFilter: (state, action) => {
      const filter = action.payload;
      return {
        ...state,
        filter: filter
      }
    },
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

export const { blockUser, usersFilter, changePage } = usersSlice.actions;

export const selectAllUsers = state => state.users.users;

export const selectUserById = (state, userId) => state.users.users.find(user => user.id === userId);

export const selectUsersFields = state => {
  const user = state.users.users[0]
  if (user) {
    const fields = Object.keys(user);
    delete fields.avatar;
    delete fields.account_type;
    delete fields.created_at;
    return fields;
  }
  return [];
}

export const selectFilter = state => state.users.filter;

export default usersSlice.reducer;