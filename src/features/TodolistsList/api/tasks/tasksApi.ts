import {instance} from "common/api/instance";

import {BaseResponse} from "common/types/commonTypes";
import {
    CreateTaskArg,
    GetTasksResponse,
    TaskType,
    UpdateTaskModelType
} from "features/TodolistsList/api/tasks/tasksApi.types";

export const tasksAPI =  {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(arg: CreateTaskArg) {
        return instance.post<BaseResponse<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title });
    },
    updateTask(taskId: string, todolistId: string, model: UpdateTaskModelType) {
        return instance.put<BaseResponse<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
};