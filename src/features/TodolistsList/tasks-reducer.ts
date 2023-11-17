import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "api/todolists-api";
import {AppThunk} from "app/store";
import {appActions} from "app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsActions} from "features/TodolistsList/todolists-reducer";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk} from "utils/create-app-async-thunk";

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

const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string, title: string }>
('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}))
        const res = await todolistsAPI.createTask(arg.todolistId, arg.title)
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
        updateTask: (
            state,
            action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todolistId: string }>,
        ) => {
            const tasksForTodolist = state[action.payload.todolistId];
            const index = tasksForTodolist.findIndex((task) => task.id === action.payload.taskId);
            if (index !== -1) {
                tasksForTodolist[index] = {...tasksForTodolist[index], ...action.payload.model};
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

export const updateTaskTC =
    (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
        (dispatch, getState) => {
            const state = getState();
            const task = state.tasks[todolistId].find((t) => t.id === taskId);
            if (!task) {
                //throw new Error("task not found in the state");
                console.warn("task not found in the state");
                return;
            }

            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...domainModel,
            };

            todolistsAPI
                .updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        const action = tasksActions.updateTask({taskId, model: domainModel, todolistId});
                        dispatch(action);
                    } else {
                        handleServerAppError(res.data, dispatch);
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch);
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
export const tasksThunks = {fetchTasks, addTask};
