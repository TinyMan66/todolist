import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk} from "common/utils";
import {LoginParamsType} from "features/auth/api/authApi.types";
import {authAPI, securityAPI} from "features/auth/api/authApi";
import {ResultCode} from "common/enums";

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        captchaUrl: null as null | string
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authThunks.captcha.fulfilled, (state, action) => {
                state.captchaUrl = action.payload.captchaUrl
            })
            .addMatcher(
                isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
                (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn;
                });
    }
});

// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(`${slice.name}/login`, async (arg, {
    dispatch,
    rejectWithValue
}) => {
    const res = await authAPI.login(arg)
    if (res.data.resultCode === ResultCode.success) {
        dispatch(authThunks.captcha())
        return {isLoggedIn: true}
    } else {
        if (res.data.resultCode === ResultCode.captcha) {
            dispatch(authThunks.captcha())
        }
        return rejectWithValue(res.data);
    }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, {
    dispatch,
    rejectWithValue
}) => {
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCode.success) {
        dispatch(clearTasksAndTodolists());
        return {isLoggedIn: false}
    } else {
        return rejectWithValue(res.data);
    }
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/initializeApp`, async (_, {rejectWithValue}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === ResultCode.success) {
        return {isLoggedIn: true}
    } else {
        return rejectWithValue(res.data);
    }
})

const captcha = createAppAsyncThunk<{ captchaUrl: string }, undefined>(`${slice.name}/captcha`, async (_, {}) => {
    const res = await securityAPI.captcha()
    return {captchaUrl: res.data.url}
})

export const authSlice = slice.reducer;
export const authActions = slice.actions;
export const authThunks = {login, logout, initializeApp, captcha}