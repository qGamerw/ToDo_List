import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import categoriesReducer from "./slices/categoriesSlice";
import tasksSliceReducer from "./slices/taskSlice";
import statusSliceReducer from "./slices/statusSlice";
import prioritySliceReducer from "./slices/prioritySlice";


export default configureStore({
    reducer: {
        users: userReducer,
        auth: authReducer,
        categories: categoriesReducer,
        tasks: tasksSliceReducer,
        status: statusSliceReducer,
        priority: prioritySliceReducer,
    },
});