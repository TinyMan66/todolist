import {appActions} from "app/app-reducer";
import {createSlice} from "@reduxjs/toolkit";
import {todolistsThunks} from "features/TodolistsList/todolists-reducer";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk, handleServerAppError} from "common/utils";
import {CreateTaskArg, TaskType, UpdateTaskArg, UpdateTaskModelType} from "features/TodolistsList/todolistsApi.types";
import {todolistsAPI} from "features/TodolistsList/todolistsApi";
import {ResultCode} from "common/enums";
import {thunkTryCatch} from "common/utils/thunkTryCatch";

const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.id];
            })
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = [];
                });
            })
            .addCase(clearTasksAndTodolists.type, () => {
                return {}
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasksForTodolist = state[action.payload.todolistId];
                const index = tasksForTodolist.findIndex((task) => task.id === action.payload.taskId);
                if (index !== -1) {
                    tasksForTodolist[index] = {...tasksForTodolist[index], ...action.payload.domainModel};
                }
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasksForTodolist = state[action.payload.todolistId];
                const index = tasksForTodolist.findIndex((tasks) => tasks.id === action.payload.taskId);
                if (index !== -1) {
                    tasksForTodolist.splice(index, 1);
                }
            })
    },
});

// thunks
const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>
(`${slice.name}/fetchTasks`, async (todolistId, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        return {tasks, todolistId}
    })
})

const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArg >
(`${slice.name}/addTask`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistsAPI.createTask(arg)
        if (res.data.resultCode === ResultCode.success) {
            const task = res.data.data.item;
            return {task}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    })
})

const updateTask = createAppAsyncThunk<UpdateTaskArg, UpdateTaskArg>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const state = getState()
        const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
        if (!task) {
            dispatch(appActions.setAppError({error: 'Task not found'}))
            return rejectWithValue(null)
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...arg.domainModel
        }

        const res = await todolistsAPI.updateTask(arg.taskId, arg.todolistId, apiModel)
        if (res.data.resultCode === ResultCode.success) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    })
})

const removeTask = createAppAsyncThunk<{taskId: string, todolistId: string}, {taskId: string, todolistId: string}>(`${slice.name}/removeTask`, async(arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistsAPI.deleteTask(arg.todolistId, arg.taskId)
        if (res.data.resultCode === ResultCode.success) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    })
})

// types
export type TasksState = Record<string, TaskType[]>

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = {fetchTasks, addTask, updateTask, removeTask};
