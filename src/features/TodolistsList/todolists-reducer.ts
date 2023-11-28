import { appActions, RequestStatusType } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "common/utils";
import {TodolistType, UpdateTodolistTitleArgType} from "features/TodolistsList/todolistsApi.types";
import {todolistsAPI} from "features/TodolistsList/todolistsApi";
import {ResultCode} from "common/enums";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todolist = state.find((todo) => todo.id === action.payload.id);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
      const todolist = state.find((todo) => todo.id === action.payload.id);
      if (todolist) {
        todolist.entityStatus = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(clearTasksAndTodolists.type, () => {
          return []
        })
        .addCase(fetchTodolists.fulfilled, (state, action) => {
          return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
        })
        .addCase(removeTodolist.fulfilled, (state, action) => {
          const index = state.findIndex((todo) => todo.id === action.payload.id);
          if (index !== -1) {
            state.splice(index, 1);
          }
        })
        .addCase(addTodolist.fulfilled, (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
        })
        .addCase(changeTodolistTitle.fulfilled, (state, action) => {
          const todolist = state.find((todo) => todo.id === action.payload.id);
          if (todolist) {
            todolist.title = action.payload.title;
          }
        })
  }
});

// thunks
const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(`${slice.name}/fetchTodolists`, async (_, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.getTodolists()
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return {todolists: res.data}
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

const removeTodolist = createAppAsyncThunk<{ id: string }, string>(`${slice.name}/removeTodolist`, async (id, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    dispatch(todolistsActions.changeTodolistEntityStatus({ id, status: "loading" }));
    const res = await todolistsAPI.deleteTodolist(id)
    if (res.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { id };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(`${slice.name}/addTodolist`, async (title, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.createTodolist(title)
    if (res.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { todolist: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})
const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(`${slice.name}/changeTodolistTitle`, async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.updateTodolist(arg.id, arg.title)
    if (res.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return arg;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {fetchTodolists, removeTodolist, addTodolist, changeTodolistTitle};
