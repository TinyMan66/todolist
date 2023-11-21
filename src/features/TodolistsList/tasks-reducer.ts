import {AppThunk} from "app/store";
import {appActions} from "app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsActions} from "features/TodolistsList/todolists-reducer";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "common/utils";
import {CreateTaskArg, TaskType, UpdateTaskArg, UpdateTaskModelType} from "features/TodolistsList/todolistsApi.types";
import {todolistsAPI} from "features/TodolistsList/todolistsApi";
import {TaskPriorities, TaskStatuses} from "common/enums/enums";

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>
('tasks/fetchTasks', async (todolistId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {tasks, todolistId}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArg >
('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}))
        const res = await todolistsAPI.createTask(arg)
        if (res.data.resultCode === 0) {
            const task = res.data.data.item;
            dispatch(appActions.setAppStatus({status: "succeeded"}));
            return {task}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const updateTask = createAppAsyncThunk<UpdateTaskArg, UpdateTaskArg>('tasks/updateTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}))
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

        const res = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return arg
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {
        removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
            const tasksForTodolist = state[action.payload.todolistId];
            const index = tasksForTodolist.findIndex((tasks) => tasks.id === action.payload.taskId);
            if (index !== -1) {
                tasksForTodolist.splice(index, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.id];
            })
            .addCase(todolistsActions.setTodolists, (state, action) => {
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
    },
});

// thunks
export const removeTaskTC =
    (taskId: string, todolistId: string): AppThunk =>
        (dispatch) => {
            todolistsAPI.deleteTask(todolistId, taskId).then(() => {
                const action = tasksActions.removeTask({taskId, todolistId});
                dispatch(action);
            });
        };

// types
export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};
export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = {fetchTasks, addTask, updateTask};
