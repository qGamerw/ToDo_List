import {createSlice} from "@reduxjs/toolkit";

export const prioritySlice = createSlice({
    name: 'priority',
    initialState: {
        priority: [],
    },
    reducers: {
        set: (state, action) => {
            state.priority = action.payload;
        }
    },
})

export const {
    set,
} = prioritySlice.actions;

export default prioritySlice.reducer;







