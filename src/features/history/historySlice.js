import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { historyAPI } from '../../api/historyAPI';

const initialState = {
  history: [],
  filter: {
    search: '',
    sortBy: 'id',
    order: 'ASC',
  },
  status: 'idle',
  error: null,
}

export const fetchHistory = createAsyncThunk('history/fetchHistory', async (filter, { rejectWithValue }) => {
  try {
    const response = await historyAPI.get(filter);
    return response;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const fetchGameData = createAsyncThunk('history/fetchGameData', async (gameId, { rejectWithValue }) => {
  try {
    const response = await historyAPI.getGameData(gameId);
    return response;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    historyFilter: (state, action) => {
      const filter = action.payload;
      return {
        ...state,
        filter: filter
      }
    },
  },
  extraReducers: {
    [fetchHistory.pending]: (state, action) => {
      return {
        ...state,
        status: 'loading'
      }
    },
    [fetchHistory.fulfilled]: (state, action) => {
      return {
        ...state,
        history: action.payload,
        status: 'succeded'
      }
    },
    [fetchHistory.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed'
      }
    },
    // [fetchGameData.fulfilled]: (state, action) => {
    //   return {
    //     ...state,
    //     currentData: action.payload,
    //   }
    // }
  }
})

export const { historyFilter } = historySlice.actions;

export const selectAllHistory = state => state.history.history;

export const selectHistoryById = (state, id) => state.history.history.find(history => history.id === id)

export const selectFilter = state => state.history.filter;

export const selectGameData = state => state.history.currentData;

export default historySlice.reducer;