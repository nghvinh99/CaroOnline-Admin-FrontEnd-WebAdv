import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { historyAPI } from '../../api/historyAPI';
import { usersAPI } from '../../api/usersAPI';

const initialState = {
  history: [],
  filter: {
    search: '',
    sortBy: 'id',
    order: 'ASC',
  },
  game: {
    data: [],
    chat: [],
  },
  playerGames: [],
  allPlayerNames: [],
  status: 'idle',
  error: null,
}

export const fetchHistory = createAsyncThunk('history/fetchHistory', async (rejectWithValue) => {
  try {
    const response = await historyAPI.get();
    return response;
  } catch (err) {
    localStorage.clear();
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const fetchPlayerHistory = createAsyncThunk('history/fetchPlayerHistory', async (userId, { rejectWithValue }) => {
  try {
    const response = await historyAPI.getWithId(userId);
    return response;
  } catch (err) {
    localStorage.clear();
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
    localStorage.clear();
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const fetchAllPlayerNames = createAsyncThunk('history/fetchAllPlayerNames', async (rejectWithValue) => {
  try {
    const response = await usersAPI.fetchAllPlayerNames();
    return response;
  } catch (err) {
    localStorage.clear();
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
    [fetchHistory.fulfilled]: (state, action) => {
      return {
        ...state,
        history: action.payload,
      }
    },
    [fetchGameData.fulfilled]: (state, action) => {
      return {
        ...state,
        game: action.payload,
      }
    },
    [fetchAllPlayerNames.fulfilled]: (state, action) => {
      return {
        ...state,
        allPlayerNames: action.payload
      }
    },
    [fetchPlayerHistory.fulfilled]: (state, action) => {
      state.playerGames = action.payload;
    }
  }
})

export const { historyFilter } = historySlice.actions;

export const selectAllHistory = state => state.history.history;

export const selectHistoryById = (state, id) => state.history.history.find(history => history.id === id)

export const selectFilter = state => state.history.filter;

export const selectGameData = state => state.history.game;

export const selectAllPlayerNames = state => state.history.allPlayerNames;

export const selectPlayerGames = state => state.history.playerGames;

export default historySlice.reducer;