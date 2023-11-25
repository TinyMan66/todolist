import { appActions, RequestStatusType } from "app/app-reducer";
import { AppThunk } from "app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "common/utils";
import {TodolistType} from "features/TodolistsList/todolistsApi.types";
import {todolistsAPI} from "features/TodolistsList/todolistsApi";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      // 1 variant
      // const index = state.findIndex(todolist => todolist.id === action.payload.id)
      // if (index !== -1) {
      //   state[index].title = action.payload.title
      // }

      // 2 variant
      const todolist = state.find((todo) => todo.id === action.payload.id);
      if (todolist) {
        todolist.title = action.payload.title;
      }
    },
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
    if (res.data.resultCode === 0) {
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

export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then(() => {
      dispatch(todolistsActions.changeTodolistTitle({ id, title: title }));
    });
  };
};

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {fetchTodolists, removeTodolist};
