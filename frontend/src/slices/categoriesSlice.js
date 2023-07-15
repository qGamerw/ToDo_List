import {createSlice} from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categoryName : "",
        categories: [],
    },
    reducers: {
        set: (state, action) => {
            state.categories = action.payload;
        },
        setName: (state, action) => {
            state.categoryName = action.payload;
        },
    },
})

export const {
    set,
    setName,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;