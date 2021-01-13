import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminAPI } from '../../api/adminAPI';

const initialState = {
  admin: null,
  status: 'idle',
  error: null,
  state: '',
}

export const resetPasswordReq = createAsyncThunk('admin/resetPasswrdReq', async (info, { rejectWithValue }) => {
  try {
    const response = await adminAPI.resetPasswordReq(info);
    return response;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const resetPassword = createAsyncThunk('admin/resetPassword', async (info, { rejectWithValue }) => {
  try {
    const response = await adminAPI.resetPassword(info);
    return response;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

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

export const adminLogin = createAsyncThunk('admin/adminLogin', async (admin, { rejectWithValue }) => {
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

export const changeEmail = createAsyncThunk('admin/changeEmail', async (info, { rejectWithValue }) => {
  try {
    const response = await adminAPI.changeEmail(info);
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
      state.state = 'OK';
    },
    [adminLogin.rejected]: (state, action) => {
      state.state = action.payload;
    },
    [adminLogin.pending]: (state, action) => {
      state.state = 'Pending';
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.admin = action.payload;
      state.state = 'OK';
    },
    [fetchProfile.pending]: (state, action) => {
      state.state = 'Pending';
    },
    [changePassword.fulfilled]: (state, action) => {
      return;
    },
    [changeEmail.fulfilled]: (state, action) => {
      state.admin.email = action.payload;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.state = action.payload;
    },
    [resetPassword.pending]: (state, action) => {
      state.state = 'Pending';
    },
    [resetPasswordReq.fulfilled]: (state, action) => {
      state.state = action.payload;
    },
    [resetPasswordReq.pending]: (state, action) => {
      state.state = 'Pending';
    }
  }
});

export const selectAdmin = state => state.admin.admin;

export default adminSlice.reducer;