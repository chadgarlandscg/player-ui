import { configureStore, combineReducers } from '@reduxjs/toolkit';
import home from '../App/Content/Home/HomeSlice';

const rootReducer = combineReducers({home})

export default configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>