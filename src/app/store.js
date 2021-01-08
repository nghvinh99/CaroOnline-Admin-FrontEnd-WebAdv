import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import drawerReducer from '../features/drawer/drawerSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    drawer: drawerReducer,
  }
});
