import {createSlice} from "@reduxjs/toolkit";

export const regularitySlice = createSlice({
    name: 'regularity',
    initialState: {
        regularity: [],
    },
    reducers: {
        set: (state, action) => {
            state.regularity = action.payload;
        }
    },
})

export const {
    set,
} = regularitySlice.actions;

export default regularitySlice.reducer;