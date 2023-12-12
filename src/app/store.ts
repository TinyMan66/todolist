import { tasksSlice } from "features/TodolistsList/model/tasks/tasksSlice";
import { todolistsSlice } from "features/TodolistsList/model/todolists/todolistsSlice";
import thunkMiddleware from "redux-thunk";
import { appSlice } from "app/appSlice";
import { authReducer } from "features/auth/model/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;
