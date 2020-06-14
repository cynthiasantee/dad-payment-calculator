import files from './reducer/files';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
    files: files.reducer
});