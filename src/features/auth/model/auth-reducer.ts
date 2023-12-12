import { appActions } from "app/appSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk, handleServerAppError} from "common/utils";
import {LoginParamsType} from "features/auth/api/authApi.types";
import {authAPI} from "features/auth/api/authApi";
import {ResultCode} from "common/enums";
import {thunkTryCatch} from "common/utils/thunkTryCatch";

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
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.login(arg)
        if (res.data.resultCode === ResultCode.success) {
            return {isLoggedIn: true }
        } else {
            const isShowAppError = !res.data.fieldsErrors.length
            handleServerAppError(res.data, dispatch, isShowAppError);
            return rejectWithValue(res.data);
        }
    })
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(clearTasksAndTodolists());
            return { isLoggedIn: false }
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    })
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean },undefined>(`${slice.name}/initializeApp`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.success) {
            return { isLoggedIn: true }
        } else {
            return rejectWithValue(null);
        }
    }).finally(()=>{
        dispatch(appActions.setAppInitialized({isInitialized: true}))
    })
})

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = {login, logout, initializeApp}