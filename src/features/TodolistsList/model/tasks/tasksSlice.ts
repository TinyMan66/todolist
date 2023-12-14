import {appActions} from "app/appSlice";
import {createSlice} from "@reduxjs/toolkit";
import {todolistsThunks} from "features/TodolistsList/model/todolists/todolistsSlice";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk} from "common/utils";
import {ResultCode} from "common/enums";
import {
    CreateTaskArg,
    TaskType,
    UpdateTaskArg,
    UpdateTaskModelType
} from "features/TodolistsList/api/tasks/tasksApi.types";
import {tasksAPI} from "features/TodolistsList/api/tasks/tasksApi";

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
(`${slice.name}/fetchTasks`, async (todolistId) => {
    const res = await tasksAPI.getTasks(todolistId)
    const tasks = res.data.items
    return {tasks, todolistId}
})

const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArg>
(`${slice.name}/addTask`, async (arg, {rejectWithValue}) => {
    const res = await tasksAPI.createTask(arg)
    if (res.data.resultCode === ResultCode.success) {
        const task = res.data.data.item;
        return {task}
    } else {
        return rejectWithValue(res.data)
    }
})

const updateTask = createAppAsyncThunk<UpdateTaskArg, UpdateTaskArg>(`${slice.name}/updateTask`, async (arg, {dispatch, rejectWithValue, getState}) => {
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

        const res = await tasksAPI.updateTask(arg.taskId, arg.todolistId, apiModel)
        if (res.data.resultCode === ResultCode.success) {
            return arg
        } else {
            return rejectWithValue(res.data)
        }
})

const removeTask = createAppAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }>(`${slice.name}/removeTask`, async (arg, {rejectWithValue}) => {
        const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId)
        if (res.data.resultCode === ResultCode.success) {
            return arg
        } else {
            return rejectWithValue(res.data)
        }
})

// types
export type TasksState = Record<string, TaskType[]>

export const tasksSlice = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = {fetchTasks, addTask, updateTask, removeTask};
