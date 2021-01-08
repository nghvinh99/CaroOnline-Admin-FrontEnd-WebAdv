import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { adminAPI } from '../../api/adminAPI';

const initialState = {
  admin: {},
  status: 'idle',
  error: null,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  // reducers: {
  //   adminLogin: state => {
  //     state.value = true;
  //   },
  //   closeNavBar: state => {
  //     state.value = false;
  //   }
  // }
});

export const adminLogin = createAsyncThunk('admin/adminLogin',
  async (admin, { rejectWithValue }) => {
    try {
      const response = await adminAPI.login(admin);
      return response.user;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  })

export default adminSlice.reducer;