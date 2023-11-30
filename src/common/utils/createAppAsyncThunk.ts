import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, AppRootStateType} from "app/store";
import {BaseResponse} from "common/types/commonTypes";

/**
 * A utility function that creates an asynchronous Redux Thunk using `createAsyncThunk`
 * with predefined types for state, dispatch, and rejectValue.
 *
 * @returns {ReturnType<createAsyncThunk.withTypes<{
 *    state: AppRootStateType;
 *    dispatch: AppDispatch;
 *    rejectValue: null | BaseResponse;
 * }>>}
 *    - The created asynchronous Redux Thunk.
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatch
    rejectValue: null | BaseResponse
}>()