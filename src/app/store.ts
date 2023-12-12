import { tasksSlice } from "features/TodolistsList/model/tasks/tasksSlice";
import { todolistsSlice } from "features/TodolistsList/model/todolists/todolistsSlice";
import thunkMiddleware from "redux-thunk";
import { appSlice } from "app/appSlice";
import { authSlice } from "features/auth/model/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;
