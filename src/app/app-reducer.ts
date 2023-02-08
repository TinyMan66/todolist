import {authAPI, ResultCode} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {AppThunk} from "./store";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

// actions
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

// thunks
export const initializeAppTC = (): AppThunk => async dispatch => {
    const res = await authAPI.me()
    if (res.data.resultCode === ResultCode.OK) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setIsInitializedAC(true))
    } else {
        dispatch(setIsInitializedAC(true))
    }
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
export type AppReducerActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetIsInitializedActionType