import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export default createSlice({
    name: 'files',
    initialState: {
        fileOne: '',
        fileTwo: ''
    },
    reducers: {
        addFileOne: (state, action: PayloadAction<string>) => {
            return {
                'fileOne': action.payload,
                'fileTwo' : state.fileTwo
            }
        },
        addFileTwo: (state, action: PayloadAction<string>) => {
            return {
                'fileOne': state.fileOne,
                'fileTwo' : action.payload
            }
        }
    }
})