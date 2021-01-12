import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from '../features/drawer/drawerSlice';
import usersReducer from '../features/users/usersSlice';
import adminReducer from '../features/admin/adminSlice';
import historyReducer from '../features/history/historySlice';

export default configureStore({
  reducer: {
    drawer: drawerReducer,
    users: usersReducer,
    admin: adminReducer,
    history: historyReducer,
  }
});
