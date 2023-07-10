import {createSlice} from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
    },
    reducers: {
        set: (state, action) => {
            state.categories = action.payload;
        }
    },
})

export const {
    set,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;