import {instance} from "common/api/instance";
import {BaseResponse} from "common/types/commonTypes";
import {
    CreateTaskArg,
    GetTasksResponse,
    TaskType,
    TodolistType,
    UpdateTaskModelType
} from "features/TodolistsList/todolistsApi.types";

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse<{ item: TodolistType }>>("todo-lists", { title: title });
    },
    deleteTodolist(id: string) {
        return instance.delete<BaseResponse>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<BaseResponse>(`todo-lists/${id}`, { title: title });
    },
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
