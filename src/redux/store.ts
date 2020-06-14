import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Need to define reducers in another file

const store = configureStore({
  reducer: rootReducer
})

// RootState is an interface representing type of entire store
export type RootState = ReturnType<typeof rootReducer>

export default store;