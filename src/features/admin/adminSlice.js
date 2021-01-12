import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminAPI } from '../../api/adminAPI';

const initialState = {
  admin: null,
  status: 'idle',
  error: null,
}

export const fetchProfile = createAsyncThunk('admin/fetchProfile', async (id, { rejectWithValue }) => {
  try {
    const response = await adminAPI.fetchAccountInfo(id);
    return response;
  } catch (err) {
    localStorage.clear();
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const adminLogin = createAsyncThunk('admin/adminLogin',
  async (admin, { rejectWithValue }) => {
    try {
      const response = await adminAPI.login(admin);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  })

export const changePassword = createAsyncThunk('admin/changePassword', async (info, { rejectWithValue }) => {
  try {
    const response = await adminAPI.changePassword(info);
    return response;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  extraReducers: {
    [adminLogin.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload);
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.admin = action.payload;
    },
    [changePassword.fulfilled]: (state, action) => {
      return;
    }
  }
});

export const selectAdmin = state => state.admin.admin;

export default adminSlice.reducer;