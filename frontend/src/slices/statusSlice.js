import {createSlice} from "@reduxjs/toolkit";

export const statusSlice = createSlice({
    name: 'status',
    initialState: {
        status: [],
    },
    reducers: {
        set: (state, action) => {
            state.status = action.payload;
        }
    },
})

export const {
    set,
} = statusSlice.actions;

export default statusSlice.reducer;