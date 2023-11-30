import { AppDispatch, AppRootStateType } from 'app/store';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {handleServerNetworkError} from "common/utils/handleServerNetworkError";
import {appActions} from "app/app-reducer";
import {BaseResponse} from "common/types/commonTypes";


export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>,
    logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
        return await logic();
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({ status: "idle" }));
    }
};