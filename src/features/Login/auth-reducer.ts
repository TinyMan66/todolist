import {
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from '../../app/app-reducer'
import {authAPI, LoginParamsType, ResultCode} from "../../api/todolists-api";
import axios, {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearTodosDataAC, ClearTodosDataActionType} from "../TodolistsList/todolists-reducer";
import {AppThunk} from "../../app/store";

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)


// thunks
export const loginTC = (loginModel: LoginParamsType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.login(loginModel)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as ({ error: string })).error
                : err.message
            dispatch(setAppErrorAC(error))
        }
        dispatch(setAppStatusAC('failed'))
    }
}

export const logoutTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.logout()
    try {
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(clearTodosDataAC())
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        const err = e as Error | AxiosError
        handleServerNetworkError(err, dispatch)
    }
}

// types
type InitialStateType = typeof initialState
export type AuthActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ClearTodosDataActionType
