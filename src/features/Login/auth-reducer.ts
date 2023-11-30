import { appActions } from "app/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk, handleServerAppError} from "common/utils";
import {LoginParamsType} from "features/Login/authApi.types";
import {authAPI} from "features/Login/authApi";
import {ResultCode} from "common/enums";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
    extraReducers: (builder) => {
      builder
          .addCase(login.fulfilled, (state, action) => {
              state.isLoggedIn = action.payload.isLoggedIn;
          })
          .addCase(logout.fulfilled, (state, action) => {
              state.isLoggedIn = action.payload.isLoggedIn;
          })
          .addCase(initializeApp.fulfilled, (state, action) =>{
          state.isLoggedIn = action.payload.isLoggedIn;
          })
  }
});

// thunks
const login = createAppAsyncThunk<{isLoggedIn: boolean}, LoginParamsType>(`${slice.name}/login`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        const res = await authAPI.login(arg)
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return {isLoggedIn: true }
        } else {
            handleServerAppError(res.data, dispatch, false);
            return rejectWithValue(res.data);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(clearTasksAndTodolists());
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return { isLoggedIn: false }
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean },undefined>(`${slice.name}/initializeApp`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            return { isLoggedIn: true }
        } else {
            return rejectWithValue(null);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        dispatch(appActions.setAppInitialized({isInitialized: true}))
    }
})

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = {login, logout, initializeApp}