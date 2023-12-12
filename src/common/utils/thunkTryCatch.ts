import {AppDispatch, AppRootStateType} from 'app/store';
import {BaseThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {handleServerNetworkError} from "common/utils/handleServerNetworkError";
import {BaseResponse} from "common/types/commonTypes";

/**
 * A utility function that wraps asynchronous logic inside a Redux Thunk,
 * handling loading, success, and error states. It catches errors, dispatches
 * them to the store, and sets the app status accordingly.
 *
 * @template T - The expected result type of the asynchronous logic.
 * @param {BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>} thunkAPI
 *    - The Redux Thunk API.
 * @param {() => Promise<T>} logic - The asynchronous logic to be executed.
 * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>}
 *    - A promise that resolves to the result of the logic or rejects with
 *      the value provided by `thunkAPI.rejectWithValue`.
 */

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>,
    logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        return await logic();
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    }
};