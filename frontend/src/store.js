import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import categoriesReducer from "./slices/categoriesSlice";

export default configureStore({
    reducer: {
        users: userReducer,
        auth: authReducer,
        categories: categoriesReducer,
    },
});